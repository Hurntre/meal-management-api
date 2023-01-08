import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BrandsModule } from '../src/brands/brands.module';
import { DatabaseModule } from '../src/database/database.module';
// import { BrandsService } from './brands.service';admi
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Users } from '../src/auth/DummyUsers';

describe('BrandController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [BrandsModule, DatabaseModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  let brandId: any;
  let addonId: any;

  describe('POST /v1/brands (Auth Guard)', () => {
    it('should fail if auth token is not provided', () => {
      return request(app.getHttpServer())
        .post('/brands')
        .send({
          name: 'KFC',
        })
        .expect((response: request.Response) => {
          expect(response.body).toStrictEqual({
            statusCode: 403,
            message: 'User unauthorized',
          });
        });
    });

    it('should fail if auth token is invalid', () => {
      return request(app.getHttpServer())
        .post('/brands')
        .set(
          'authorization',
          `Bearer MjA.F24QA5r-P4rfF1lZF-O5458OX3EoeY_GVGAHv1Okf42hzFyhSaLvXVJTnZQD`,
        )
        .send({
          name: 'KFC',
        })
        .expect((response: request.Response) => {
          expect(response.body).toStrictEqual({
            statusCode: 403,
            message: 'User unauthorized',
          });
        });
    });

    it('should fail if user is not admin', () => {
      return request(app.getHttpServer())
        .post('/brands')
        .set('authorization', `Bearer ${Users[0].token}`)
        .send({
          name: 'KFC',
        })
        .expect((response: request.Response) => {
          expect(response.body).toStrictEqual({
            statusCode: 403,
            message: 'This user is not authorized to access this route',
          });
        });
    });
  });

  describe('POST /v1/brands', () => {
    it('should fail if required field is not provided', () => {
      return request(app.getHttpServer())
        .post('/brands')
        .set('authorization', `Bearer ${Users[1].token}`)
        .set('Accept', 'application/json')
        .send({
          value: 'random',
        })
        .expect((response: request.Response) => {
          expect(response.body).toStrictEqual({
            statusCode: 400,
            message: ['name must be a string', 'name should not be empty'],
            error: 'Bad Request',
          });
        });
    });

    it('should create a new brand and return successful response', async () => {
      return await request(app.getHttpServer())
        .post('/brands')
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({
          name: 'KFC',
        })
        .expect(async (response: request.Response) => {
          brandId = response.body.data.id;

          expect(response.body.code).toEqual(201);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual('Brand created successfully');
          expect(response.body.data.name).toEqual('kfc');
        });
    });

    it('should fail to create new brand and return error response if brand already exists', () => {
      return request(app.getHttpServer())
        .post('/brands')
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({
          name: 'KFC',
        })
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(400);
          expect(response.body.status).toEqual(false);
          expect(response.body.message).toEqual('Brand already exists');
        });
    });
  });

  describe('GET /v1/brands', () => {
    it('should get all brands successfully', () => {
      return request(app.getHttpServer())
        .get('/brands')
        .set('authorization', `Bearer ${Users[1].token}`)
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(200);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual(
            'Brands successfully retrieved',
          );
          expect(response.body.data.length).toEqual(1);
        });
    });
  });

  describe('GET /v1/brands/:brandId', () => {
    it('should get single brand successfully', () => {
      return request(app.getHttpServer())
        .get(`/brands/${brandId}`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(200);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual('Brand successfully retrieved');
          expect(response.body.data).toStrictEqual({
            id: brandId,
            name: 'kfc',
          });
        });
    });

    it('should fail to get brand', () => {
      return request(app.getHttpServer())
        .get(`/brands/${brandId + 1}`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(404);
          expect(response.body.status).toEqual(false);
          expect(response.body.message).toEqual('Brand not found');
        });
    });
  });

  describe('POST /v1/brands/:brandId/addons', () => {
    it('should fail if required field is not provided', () => {
      return request(app.getHttpServer())
        .post(`/brands/${brandId}/addons`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({})
        .expect((response: request.Response) => {
          expect(response.body).toStrictEqual({
            statusCode: 400,
            message: [
              'name must be a string',
              'name should not be empty',
              'price must be a number conforming to the specified constraints',
              'price should not be empty',
            ],
            error: 'Bad Request',
          });
        });
    });

    it('should create a new brand addon and return successful response', async () => {
      return await request(app.getHttpServer())
        .post(`/brands/${brandId}/addons`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({
          name: 'Moin-moin',
          description: 'Freshly cooked bean cake',
          price: 350,
          category: 'topping',
        })
        .expect((response: request.Response) => {
          addonId = response.body.data.id;
          delete response.body.data.id;

          expect(response.body.code).toEqual(201);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual('Addon created successfully');
          expect(response.body.data).toEqual({
            name: 'Moin-moin',
            description: 'Freshly cooked bean cake',
            price: 350,
            category: 'topping',
            brandId,
          });
        });
    });

    it('should fail to create new addon if brand does not exist', () => {
      return request(app.getHttpServer())
        .post(`/brands/${brandId + 1}/addons`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({
          name: 'Salad',
          description: 'fruit salad',
          price: 500,
        })
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(404);
          expect(response.body.status).toEqual(false);
          expect(response.body.message).toEqual(
            'Error creating addon. Brand does not exist',
          );
        });
    });
  });

  describe('POST /v1/brands/:brandId/addon-categories', () => {
    it('should fail if required field is not provided', () => {
      return request(app.getHttpServer())
        .post(`/brands/${brandId}/addon-categories`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({})
        .expect((response: request.Response) => {
          expect(response.body).toStrictEqual({
            statusCode: 400,
            message: ['name must be a string', 'name should not be empty'],
            error: 'Bad Request',
          });
        });
    });

    it('should create a new brand addon category and return successful response', () => {
      return request(app.getHttpServer())
        .post(`/brands/${brandId}/addon-categories`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({
          name: 'Side-dish',
        })
        .expect((response: request.Response) => {
          delete response.body.data.id;

          expect(response.body.code).toEqual(201);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual(
            'Addon category created successfully',
          );
          expect(response.body.data).toEqual({
            name: 'Side-dish',
            brandId,
          });
        });
    });

    it('should fail to create new addon if brand does not exist', () => {
      return request(app.getHttpServer())
        .post(`/brands/${brandId + 1}/addon-categories`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({
          name: 'Topping',
        })
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(404);
          expect(response.body.status).toEqual(false);
          expect(response.body.message).toEqual(
            'Error creating addon category. Brand does not exist',
          );
        });
    });
  });

  describe('GET /v1/brands/:brandId/addons', () => {
    it('should get all brands addons', () => {
      return request(app.getHttpServer())
        .get(`/brands/${brandId}/addons`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(200);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual(
            'Brand addons successfully retrieved',
          );
          expect(response.body.data).toEqual([
            {
              id: addonId,
              name: 'Moin-moin',
              description: 'Freshly cooked bean cake',
              price: 350,
              category: 'topping',
              brandId,
            },
          ]);
        });
    });
  });

  describe('GET /v1/brands/:brandId/addons/:addonId', () => {
    it('should get a single brand addon', () => {
      return request(app.getHttpServer())
        .get(`/brands/${brandId}/addons/${addonId}`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(200);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual('Addon successfully retrieved');
          expect(response.body.data).toEqual({
            id: addonId,
            name: 'Moin-moin',
            description: 'Freshly cooked bean cake',
            price: 350,
            category: 'topping',
            brandId,
          });
        });
    });

    it('should fail to get single brand addon', () => {
      return request(app.getHttpServer())
        .get(`/brands/${brandId}/addons/${addonId + 1}`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(404);
          expect(response.body.status).toEqual(false);
          expect(response.body.message).toEqual('Addon not found');
        });
    });
  });

  describe('PATCH /v1/brands/:brandId/addons/:addonId', () => {
    it('should update brand addon and return successful response', () => {
      return request(app.getHttpServer())
        .patch(`/brands/${brandId}/addons/${addonId}`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({
          price: 750,
          category: 'Side-dish',
        })
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(200);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual('Addon successfully updated');
          expect(response.body.data).toEqual({
            id: addonId,
            name: 'Moin-moin',
            description: 'Freshly cooked bean cake',
            price: 750,
            category: 'Side-dish',
            brandId,
          });
        });
    });

    it('should fail to updated addon if it does not exist', () => {
      return request(app.getHttpServer())
        .patch(`/brands/${brandId + 1}/addons/${addonId + 1}`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .send({
          name: 'Salad',
          description: 'fruit salad',
          price: 500,
        })
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(400);
          expect(response.body.status).toEqual(false);
          expect(response.body.message).toEqual('Addon could not be updated');
        });
    });
  });

  describe('DELETE /v1/brands/:brandId/addons/:addonId', () => {
    it('should update brand addon and return successful response', () => {
      return request(app.getHttpServer())
        .delete(`/brands/${brandId}/addons/${addonId}`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(200);
          expect(response.body.status).toEqual(true);
          expect(response.body.message).toEqual('Addon successfully deleted');
          expect(response.body.data).toEqual({
            id: addonId,
            name: 'Moin-moin',
            description: 'Freshly cooked bean cake',
            price: 750,
            category: 'Side-dish',
            brandId,
          });
        });
    });

    it('should fail to updated addon if it does not exist', () => {
      return request(app.getHttpServer())
        .delete(`/brands/${brandId + 1}/addons/${addonId}`)
        .set('authorization', `Bearer ${Users[1].token}`)
        .expect((response: request.Response) => {
          expect(response.body.code).toEqual(400);
          expect(response.body.status).toEqual(false);
          expect(response.body.message).toEqual('Addon could not be deleted');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

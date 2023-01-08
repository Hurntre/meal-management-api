import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { AddonModel } from '../database/models/addon.model';
import { Addon } from './interface/addon.interface';

@Injectable()
export class BrandAddonsService {
  constructor(
    @Inject('AddonModel') private addonModel: ModelClass<AddonModel>,
  ) {}

  async create(props: Addon): Promise<Addon> {
    return await this.addonModel.query().insert(props).returning('*');
  }

  async findAll(brandId: number) {
    return await this.addonModel.query().where({ brandId });
  }

  async findOne(brandId: number, addonId: number) {
    return await this.addonModel
      .query()
      .where({ id: addonId, brandId })
      .first();
  }

  async update(brandId: number, addonId: number, props) {
    return await this.addonModel
      .query()
      .patch(props)
      .where({ id: addonId, brandId })
      .returning('*')
      .first();
  }

  async delete(brandId: number, addonId: number) {
    return await this.addonModel
      .query()
      .delete()
      .where({ id: addonId, brandId })
      .returning('*')
      .first();
  }
}

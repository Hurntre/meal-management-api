import { Global, Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandAddonsService } from './brand-addons.service';
import { BrandAddonCategoriesService } from './brand-addon-categories.service';
import { AuthorizationGuard } from '../auth/Guards/authorization.guard';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  controllers: [BrandsController],
  providers: [
    BrandsService,
    BrandAddonsService,
    BrandAddonCategoriesService,
    { provide: APP_GUARD, useClass: AuthorizationGuard },
  ],
  exports: [BrandsService, BrandAddonsService, BrandAddonCategoriesService],
})
export class BrandsModule {}

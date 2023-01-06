import { Global, Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { BrandAddonsService } from './brand-addons.service';
import { BrandAddonCategoriesService } from './brand-addon-categories.service';

@Global()
@Module({
  controllers: [BrandsController],
  providers: [BrandsService, BrandAddonsService, BrandAddonCategoriesService],
  exports: [BrandsService, BrandAddonsService, BrandAddonCategoriesService],
})
export class BrandsModule {}

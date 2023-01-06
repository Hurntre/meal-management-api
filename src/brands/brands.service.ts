import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BrandAddonsService } from './brand-addons.service';
import { BrandAddonCategoriesService } from './brand-addon-categories.service';
import { BrandModel } from '../database/models/brand.model';
import { AddonModel } from 'src/database/models/addon.model';
import { AddonCategoryModel } from 'src/database/models/addon-category.model';

// return error message where needed
@Injectable()
export class BrandsService {
  constructor(
    private brandAddonsService: BrandAddonsService,
    private brandAddonCategoriesService: BrandAddonCategoriesService,
    @Inject('BrandModel') private brandModel: ModelClass<BrandModel>,
  ) {}

  async findAll(): Promise<BrandModel[]> {
    return await this.brandModel.query();
  }

  async findOne(id: number): Promise<BrandModel> {
    return await this.brandModel.query().findById(id);
  }

  // create an interface for props
  async createAddon(props): Promise<AddonModel> {
    // find brand first, if brand does not exist, send error message
    return await this.brandAddonsService.create(props);
  }

  async createAddonCategory(props): Promise<AddonCategoryModel> {
    return await this.brandAddonCategoriesService.create(props);
  }

  async findAllAddons(brandId: number): Promise<AddonModel[]> {
    return await this.brandAddonsService.findAll(brandId);
  }

  async findAddon(brandId: number, addonId: number): Promise<AddonModel> {
    return await this.brandAddonsService.findOne(brandId, addonId);
  }

  // create and interface for update
  async updateAddon(
    brandId: number,
    addonId: number,
    props,
  ): Promise<AddonModel> {
    return await this.brandAddonsService.update(brandId, addonId, props);
  }

  async deleteAddon(brandId: number, addonId: number): Promise<AddonModel> {
    return await this.brandAddonsService.delete(brandId, addonId);
  }
}

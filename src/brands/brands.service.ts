import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BrandAddonsService } from './brand-addons.service';
import { BrandAddonCategoriesService } from './brand-addon-categories.service';
import { BrandModel } from '../database/models/brand.model';
import { AddonModel } from 'src/database/models/addon.model';
import { AddonCategoryModel } from 'src/database/models/addon-category.model';
import { Addon } from './interface/addon.interface';
import { AddonCategory } from './interface/addon-category.interface';
import { UpdateAddon } from './interface/update-addon.interface';

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

  async createAddon(props: Addon): Promise<AddonModel | boolean> {
    try {
      return await this.brandAddonsService.create(props);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async createAddonCategory(
    props: AddonCategory,
  ): Promise<AddonCategoryModel | boolean> {
    try {
      return await this.brandAddonCategoriesService.create(props);
    } catch (err) {
      console.error(err);
      return false;
    }
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
    props: UpdateAddon,
  ): Promise<AddonModel> {
    return await this.brandAddonsService.update(brandId, addonId, props);
  }

  async deleteAddon(brandId: number, addonId: number): Promise<AddonModel> {
    return await this.brandAddonsService.delete(brandId, addonId);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BrandAddonsService } from './brand-addons.service';
import { BrandAddonCategoriesService } from './brand-addon-categories.service';
import { BrandModel } from '../database/models/brand.model';
import { Addon } from './interface/addon.interface';
import { AddonCategory } from './interface/addon-category.interface';
import { UpdateAddon } from './interface/update-addon.interface';
import { Brand } from './interface/brand.interface';

@Injectable()
export class BrandsService {
  constructor(
    private brandAddonsService: BrandAddonsService,
    private brandAddonCategoriesService: BrandAddonCategoriesService,
    @Inject('BrandModel') private brandModel: ModelClass<BrandModel>,
  ) {}

  async create(name: string): Promise<Brand> {
    return await this.brandModel
      .query()
      .insert({ name: name.toLocaleLowerCase() })
      .returning('*');
  }
  async findAll(): Promise<Brand[]> {
    return await this.brandModel.query();
  }

  async findOne(id: number): Promise<Brand> {
    return await this.brandModel.query().findById(id);
  }

  async findOneByName(name: string): Promise<Brand> {
    return await this.brandModel
      .query()
      .where({ name: name.toLocaleLowerCase() })
      .first();
  }

  async createAddon(props: Addon): Promise<Addon | boolean> {
    try {
      return await this.brandAddonsService.create(props);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async createAddonCategory(
    props: AddonCategory,
  ): Promise<AddonCategory | boolean> {
    try {
      return await this.brandAddonCategoriesService.create(props);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async findAllAddons(brandId: number): Promise<Addon[]> {
    return await this.brandAddonsService.findAll(brandId);
  }

  async findAddon(brandId: number, addonId: number): Promise<Addon> {
    return await this.brandAddonsService.findOne(brandId, addonId);
  }

  // create and interface for update
  async updateAddon(
    brandId: number,
    addonId: number,
    props: UpdateAddon,
  ): Promise<Addon> {
    return await this.brandAddonsService.update(brandId, addonId, props);
  }

  async deleteAddon(brandId: number, addonId: number): Promise<Addon> {
    return await this.brandAddonsService.delete(brandId, addonId);
  }
}

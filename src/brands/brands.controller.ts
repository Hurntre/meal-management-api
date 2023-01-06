import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { AddonDto } from './dto/addon.dto';
import { AddonCategoryDto } from './dto/addon-category.dto';
import { BrandsService } from './brands.service';
import { BrandModel } from 'src/database/models/brand.model';
import { AddonModel } from 'src/database/models/addon.model';
import { AddonCategoryModel } from 'src/database/models/addon-category.model';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  findAll(): Promise<BrandModel[]> {
    return this.brandsService.findAll();
  }

  @Get(':brandId')
  async findOne(
    @Param('brandId', new ParseIntPipe()) brandId: number,
  ): Promise<BrandModel> {
    return this.brandsService.findOne(brandId);
  }

  // add a middleware to verify input

  @Post(':brandId/addons')
  async createAddon(
    @Body() createAddonDto: AddonDto,
    @Param('brandId', new ParseIntPipe()) brandId: number,
  ): Promise<AddonModel | string> {
    return this.brandsService.createAddon({ ...createAddonDto, brandId });
  }

  @Post(':brandId/addon-categories')
  async createAddonCategory(
    @Body() createAddonCategoryDto: AddonCategoryDto,
    @Param('brandId', new ParseIntPipe()) brandId: number,
  ): Promise<AddonCategoryModel | string> {
    return this.brandsService.createAddonCategory({
      ...createAddonCategoryDto,
      brandId,
    });
  }

  @Get(':brandId/addons')
  async findAllAddons(
    @Param('brandId', new ParseIntPipe()) brandId: number,
  ): Promise<AddonModel[] | string> {
    return this.brandsService.findAllAddons(brandId);
  }

  @Get(':brandId/addons/:addonId')
  async findAddon(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ): Promise<AddonModel | string> {
    return this.brandsService.findAddon(brandId, addonId);
  }

  @Patch(':brandId/addons/:addonId')
  async updateAddon(
    @Body() updateAddonDto: AddonDto,
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ): Promise<AddonModel | string> {
    return this.brandsService.updateAddon(brandId, addonId, updateAddonDto);
  }

  @Delete(':brandId/addons/:addonId')
  async deleteAddon(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ): Promise<AddonModel | string> {
    return this.brandsService.deleteAddon(brandId, addonId);
  }
}

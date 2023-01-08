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
import { BrandDto } from './dto/brand.dto';
import { AddonDto } from './dto/addon.dto';
import { AddonCategoryDto } from './dto/addon-category.dto';
import { AddonUpdateDto } from './dto/addon-update.dto';
import { BrandsService } from './brands.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('brands')
@Roles(Role.Admin)
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  async findAll() {
    const brands = await this.brandsService.findAll();

    return {
      code: 200,
      status: true,
      message: 'Brands successfully retrieved',
      data: brands,
    };
  }

  @Post()
  async create(@Body() createBrandDto: BrandDto) {
    const existingBrand = await this.brandsService.findOneByName(
      createBrandDto.name,
    );

    if (existingBrand) {
      return {
        code: 400,
        status: false,
        message: 'Brand already exists',
      };
    }

    const brand = await this.brandsService.create(createBrandDto.name);

    if (!brand) {
      return {
        code: 400,
        status: false,
        message: 'Unable to create brand. Contact Admin',
      };
    }

    return {
      code: 201,
      status: true,
      message: 'Brand created successfully',
      data: brand,
    };
  }

  @Get(':brandId')
  async findOne(@Param('brandId', new ParseIntPipe()) brandId: number) {
    const brand = await this.brandsService.findOne(brandId);
    return {
      code: brand ? 200 : 404,
      status: brand ? true : false,
      message: brand ? 'Brand successfully retrieved' : 'Brand not found',
      data: brand,
    };
  }

  @Post(':brandId/addons')
  async createAddon(
    @Body() createAddonDto: AddonDto,
    @Param('brandId', new ParseIntPipe()) brandId: number,
  ) {
    const brand = await this.brandsService.findOne(brandId);

    if (!brand) {
      return {
        code: 404,
        status: false,
        message: 'Error creating addon. Brand does not exist',
      };
    }

    const addon = await this.brandsService.createAddon({
      ...createAddonDto,
      brandId,
    });

    if (!addon) {
      return {
        code: 400,
        status: false,
        message: 'Unable to create addon. Contact Admin',
      };
    }

    return {
      code: 201,
      status: true,
      message: 'Addon created successfully',
      data: addon,
    };
  }

  @Post(':brandId/addon-categories')
  async createAddonCategory(
    @Body() createAddonCategoryDto: AddonCategoryDto,
    @Param('brandId', new ParseIntPipe()) brandId: number,
  ) {
    const brand = await this.brandsService.findOne(brandId);

    if (!brand) {
      return {
        code: 404,
        status: false,
        message: 'Error creating addon category. Brand does not exist',
      };
    }

    const addonCategory = await this.brandsService.createAddonCategory({
      ...createAddonCategoryDto,
      brandId,
    });

    if (!addonCategory) {
      return {
        code: 400,
        status: false,
        message: 'Unable to create addon category. Contact Admin',
      };
    }

    return {
      code: 201,
      status: true,
      message: 'Addon category created successfully',
      data: addonCategory,
    };
  }

  @Get(':brandId/addons')
  async findAllAddons(@Param('brandId', new ParseIntPipe()) brandId: number) {
    const addons = await this.brandsService.findAllAddons(brandId);

    return {
      code: 200,
      status: true,
      message: 'Brand addons successfully retrieved',
      data: addons,
    };
  }

  @Get(':brandId/addons/:addonId')
  async findAddon(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ) {
    const addon = await this.brandsService.findAddon(brandId, addonId);

    return {
      code: addon ? 200 : 404,
      status: addon ? true : false,
      message: addon ? 'Addon successfully retrieved' : 'Addon not found',
      data: addon,
    };
  }

  @Patch(':brandId/addons/:addonId')
  async updateAddon(
    @Body() updateAddonDto: AddonUpdateDto,
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ) {
    const updatedAddon = await this.brandsService.updateAddon(
      brandId,
      addonId,
      updateAddonDto,
    );

    return {
      code: updatedAddon ? 200 : 400,
      status: updatedAddon ? true : false,
      message: updatedAddon
        ? 'Addon successfully updated'
        : 'Addon could not be updated',
      data: updatedAddon,
    };
  }

  @Delete(':brandId/addons/:addonId')
  async deleteAddon(
    @Param('brandId', new ParseIntPipe()) brandId: number,
    @Param('addonId', new ParseIntPipe()) addonId: number,
  ) {
    const deletedAddon = await this.brandsService.deleteAddon(brandId, addonId);

    return {
      code: deletedAddon ? 200 : 400,
      status: deletedAddon ? true : false,
      message: deletedAddon
        ? 'Addon successfully deleted'
        : 'Addon could not be deleted',
      data: deletedAddon,
    };
  }
}

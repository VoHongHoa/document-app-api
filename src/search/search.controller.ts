import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchKeyResponse } from './response';

@Controller('search')
export class SearchController {
  constructor(private service: SearchService) {}
  @Get('key-search')
  getSearchKey() {
    return this.service.getSearchKey();
  }

  @Post()
  search(@Body() keySeach: SearchKeyResponse[]) {
    return this.service.searchDocument(keySeach);
  }
}

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SearchResult } from '../web/search-result.model';

@ObjectType()
export class Search {
  @Field((_type) => Int)
  total_result_count: number;

  @Field((_type) => [SearchResult])
  results: SearchResult[];

  constructor(doc: unknown) {
    this.total_result_count = doc['domainResponses'][0]['totalResultCount'];
    this.results = doc['domainResponses'][0]['results'].map(
      (result: unknown) => new SearchResult(result),
    );
  }
}

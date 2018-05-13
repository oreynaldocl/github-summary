import { TestBed, inject } from '@angular/core/testing';

import { UtilsService } from './utils.service';

fdescribe('UtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
  });

  it('should be created', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));

  describe('getLastPage', () => {
    it('should return 0 if link header is empty', inject([UtilsService], (service: UtilsService) => {
      let result = service.getLastPage(null);
      expect(result).toBe(0);
      result = service.getLastPage(undefined);
      expect(result).toBe(0);
      result = service.getLastPage('');
      expect(result).toBe(0);
    }));

    it('should return 0 if last in link header doesn\'t exist ', inject([UtilsService], (service: UtilsService) => {
      // tslint:disable-next-line
      const linkHeader = '<https://api.github.com/repositories/{repo}/pulls?per_page=1&page=2>; rel="next", <https://api.github.com/repositories/{repo}/pulls?per_page=1&page=5>; rel="no_last"';
      const result = service.getLastPage(linkHeader);
      expect(result).toBe(0);
    }));

    it('should return page of last link', inject([UtilsService], (service: UtilsService) => {
      const page = 5;
      // tslint:disable-next-line
      const linkHeader = `<https://api.github.com/repositories/{repo}/pulls?per_page=1&page=2>; rel="next", <https://api.github.com/repositories/{repo}/pulls?per_page=1&page=${page}>; rel="last"`;
      const result = service.getLastPage(linkHeader);
      expect(result).toBe(page);
    }));
  });

  describe('getQueryParam', () => {
    it('should return empty if url or name are empty', inject([UtilsService], (service: UtilsService) => {
      let result = service.getQueryParam(null, 'page');
      expect(result).toBe('');
      result = service.getQueryParam('http://', null);
      expect(result).toBe('');
    }));

    it('should return undefined if there is no query param', inject([UtilsService], (service: UtilsService) => {
      const result = service.getQueryParam('https://api.github.com/repositories/{repo}/pulls', 'page');
      expect(result).toBe(undefined);
    }));

    it('should return undefined if param doesn\'t exist ', inject([UtilsService], (service: UtilsService) => {
      const result = service.getQueryParam('https://api.github.com/repositories/{repo}/pulls?per_page=15', 'page');
      expect(result).toBe(undefined);
    }));

    it('should return param if exists', inject([UtilsService], (service: UtilsService) => {
      const param = `page=5`;
      const result = service.getQueryParam(`https://api.github.com/repositories/{repo}/pulls?${param}`, 'page');
      expect(result).toBe(param);
    }));
  });
});

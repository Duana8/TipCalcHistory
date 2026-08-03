import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('должен учитывать не существующий индекс при удалении', () => {
    const nameProduct = 'Пироженое';
    service.addToOrder('img.jpg', nameProduct, 250);
    expect(service.orderList()).toHaveLength(1);
    service.removeFromOrder(999);
    expect(service.orderList()).toHaveLength(1);
    expect(service.orderList()[0].dish).toBe(nameProduct);
  });
});

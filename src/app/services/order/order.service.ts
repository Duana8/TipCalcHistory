import { Injectable, signal, computed } from "@angular/core";

export interface OrderItem {
  image: string;
    dish: string;
    price: number;
}

@Injectable({
    providedIn:'root'
})

export class OrderService {
    readonly menu = [
        { image: 'https://avatars.mds.yandex.net/get-vertis-journal/4471904/47173cbb-a7ca-4ac7-8e9b-52560be28c2a.jpg/1600x1600',
            dish: 'Раф', price: 150},
        { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB3d-6NbjyDDo02PNsKReHqTjGTfN6RYVyrB2jk8mooLyZVuU_sBJnUHI&s=10',
             dish: 'Эспрессо', price: 180},
        { image: 'https://cheese-cake.ru/DesertImg/kruassan-dlya-vypekaniya-mrg-s-shokoladnoj-nachinkoj-90-g-0.jpg',
             dish: 'Круассан', price: 120}
    ];

    orderList =  signal<OrderItem[]>([]);

    addToOrder(image: string, dish: string, price: number) { 
        this.orderList.update(list => [...list, {image, dish, price}]);
        console.log('Добавлено в заказ', dish, price);
    }

    removeFromOrder(index: number) { 
        const removeItem=this.orderList()[index];
        this.orderList.update(list => list.filter((_, i) => i!==index));
        if (removeItem){
             console.log(`Удаленная продукция: №${index}. 
                ${removeItem.dish} ${removeItem.price}`);
        }
    }
}
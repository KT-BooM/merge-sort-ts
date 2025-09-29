import { merge } from './main.ts';


function test(name: string, testFn: () => void) {
    try {
        testFn();
        console.log(`✅ ${name}`);
    } catch (error) {
        console.log(`❌ ${name}: ${error}`);
    }
}


console.log('Running merge function tests...\n');

test('basic functionality with simple arrays', () => {
    const collection_1 = [10, 5, 1];
    const collection_2 = [2, 6, 8];
    const collection_3 = [3, 7, 9];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([1, 2, 3, 5, 6, 7, 8, 9, 10]);
});

test('handles empty arrays', () => {
    const collection_1: number[] = [];
    const collection_2 = [1, 3, 5];
    const collection_3 = [2, 4, 6];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
});

test('handles all empty arrays', () => {
    const result = merge([], [], []);
    expect(result).toEqual([]);
});

test('handles single element arrays', () => {
    const collection_1 = [5];
    const collection_2 = [3];
    const collection_3 = [7];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([3, 5, 7]);
});

test('handles duplicate values', () => {
    const collection_1 = [5, 5, 1];
    const collection_2 = [1, 5, 8];
    const collection_3 = [3, 5, 9];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([1, 1, 3, 5, 5, 5, 5, 8, 9]);
});

test('handles negative numbers', () => {
    const collection_1 = [3, -1, -5];
    const collection_2 = [-4, 0, 2];
    const collection_3 = [-2, 1, 4];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([-5, -4, -2, -1, 0, 1, 2, 3, 4]);
});

test('handles arrays of different lengths', () => {
    const collection_1 = [20, 15, 10, 5];
    const collection_2 = [1, 8];
    const collection_3 = [12, 18, 25, 30, 35];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([1, 5, 8, 10, 12, 15, 18, 20, 25, 30, 35]);
});

test('handles large numbers', () => {
    const collection_1 = [1000000, 500000, 100000];
    const collection_2 = [200000, 800000];
    const collection_3 = [300000, 900000];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([100000, 200000, 300000, 500000, 800000, 900000, 1000000]);
});

test('handles one array being much larger', () => {
    const collection_1 = [100];
    const collection_2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const collection_3 = [50];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 50, 100]);
});

test('edge case: collection_1 only has one element smaller than others', () => {
    const collection_1 = [1];
    const collection_2 = [5, 10];
    const collection_3 = [8, 15];

    const result = merge(collection_1, collection_2, collection_3);
    expect(result).toEqual([1, 5, 8, 10, 15]);
});

console.log('\nTests completed!');
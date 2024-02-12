import random
import csv

num_cases_per_item = 3

def extractCsv(file_path):
    data = []
    with open(file_path, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            data.append(row)
    return data[1:]



def generate_random_cases(food_items_data, num_cases, cases: list):
    for food_item, min_temp, max_temp, min_days, max_days in food_items_data:
        for _ in range(num_cases):
            temp = round(random.uniform(float(min_temp), float(max_temp)), 1)
            days = random.randint(int(min_days), int(max_days))
            cases.append([food_item, temp, days])


def write_list_to_csv(data, file_path):
    with open(file_path, 'w', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(data)



cases = []
data = extractCsv('./idle.csv')
generate_random_cases(data, num_cases_per_item, cases)

data = extractCsv('./avg.csv')
generate_random_cases(data, num_cases_per_item, cases)


cases.insert(0, ['Food Item', 'Temp.(in degree C)', 'Time period(in days)'])
write_list_to_csv(cases, 'test4.csv')



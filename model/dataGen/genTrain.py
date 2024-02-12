import csv


parts = 15;



def extractCsv(file_path):
    data = []
    with open(file_path, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            data.append(row)
    return data[1:]


def divide_floats(start, end, n):
    step = (end - start) / n
    divisions = [start + i * step for i in range(n)]
    divisions.append(end)  # Ensure end value is included
    return divisions



def genCombinations(store: list, res: list):
    for row in store:
        #parts = parts + 1
        tempDivisions = divide_floats(float(row[1]), float(row[2]), parts)
        daysDivisions = divide_floats(float(row[3]), float(row[4]), parts)
        i = 0; j = len(daysDivisions) - 1;
        while (i < len(tempDivisions) and j >= 0):
            res.append([row[0], str(tempDivisions[i]), str(daysDivisions[j])])
            i=i+1
            j=j-1


def write_list_to_csv(data, file_path):
    with open(file_path, 'w', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(data)



def main():
    res = []
    store = extractCsv('./idle.csv')
    genCombinations(store, res);
    store = extractCsv('./avg.csv')
    genCombinations(store, res);

    res.insert(0, ['Food Item', 'Temp.(in degree C)', 'Time period(in days)'])
    write_list_to_csv(res, 'train.csv')


main()



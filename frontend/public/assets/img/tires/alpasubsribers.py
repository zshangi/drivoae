
import pymysql
pymysql.install_as_MySQLdb()
import MySQLdb
import xlrd



database = MySQLdb.connect (host='alpasoft.ir',port=int(3306),user='alpasoft_alpasoft',passwd='zfqyFxgXg=.$',db='alpasoft_alpa',autocommit=True)
cursor = database.cursor()


import pymysql
pymysql.install_as_MySQLdb()
import MySQLdb
import xlrd

import pandas as pd

df = pd.read_excel('1255481088_-224921620.xlsx')
print(df.iloc[:, 1]
)



insert_query = "INSERT INTO base_electsubscriber (name,cityname,city_id,address,subscriptionType,docNo,idNo,tariffDesc_id,buildingNo,passCom) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"


for r in range(0,len(df)):

    name = df.iloc[r, 1]
    cityname= df.iloc[r, 20]
    city_id=1
    address= df.iloc[r, 23]
    subscriptionType= df.iloc[r, 5]
    docNo  = df.iloc[r, 2]
    idNo  = df.iloc[r, 4]
    tariffDesc_id= df.iloc[r, 7]
    buildingNo= df.iloc[r, 15]
    passCom = df.iloc[r, 3]

    product_details_value = (name,cityname,city_id,address,subscriptionType,docNo,idNo,tariffDesc_id,buildingNo,passCom)
    print(name)
    
    cursor.execute(insert_query,product_details_value)
    database.commit()
        

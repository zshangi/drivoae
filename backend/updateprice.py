
import pyodbc 
import pymysql

pymysql.install_as_MySQLdb()

def my_cron_job():
    server = 'gcccoastmsdb1.cujpiuqzsj4l.ap-south-1.rds.amazonaws.com,1433' 
    database = 'gcccoastmsdb' 
    username = 'gssusr24coast' 
    password = 'Gcc0!12345DB'
    databasegcccoast = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';ENCRYPT=yes;UID='+username+';PWD='+ password +';Encrypt=yes;TrustServerCertificate=yes' )
    cursordatabasegcccoast = databasegcccoast.cursor()


    databasedrivo = pymysql.connect (host='drivo.ae',ENGINE='django.db.backends.mysql',port=int(3306),user='drivoae__drivo',passwd=')Uk$e}ak,(3b',db='drivoae_drivodev_db',autocommit=True)
    cursordrivo = databasedrivo.cursor()
    
    cursordrivo.execute("SELECT * FROM base_tyreproduct")
    rowdrivos = cursordrivo.fetchall() 
    for rowdrivo in rowdrivos:
        itcode=str(rowdrivo[4].strip())
        print("drivo:"+itcode)
        a="SELECT * FROM WITMAST where ITCODE="
        b=a+"'"+str(itcode)+"'"
        print(b)        
        cursordatabasegcccoast.execute(b)
        rows = cursordatabasegcccoast.fetchall()
        for row in rows:
            sprice=row[24]
            countinstock=row[21]
            print("WITMAST:"+itcode,sprice)
            a="update base_tyreproduct set  price="
            b=str(sprice)
            bb=" and countInStock="
            bbb=str(countinstock)
            c=" where ItCode="
            d=a+b+bb+bbb+c+"'"+str(itcode)+"'"
            print(d)
            cursordrivo.execute(d)
            databasedrivo.commit()
my_cron_job()
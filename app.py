import time
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_mysqldb import MySQL


# Iniciando el servidor

app = Flask(__name__)

# Configuraciones
# session:
app.secret_key = 'unaclasesecreta'
app.config['SESSION_TYPE'] = 'filesystem'



# Conexión a MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'test'
mysql = MySQL(app)



@app.route('/')
def Index():
    return render_template('index.html')


@app.route('/api/jsondeprueba')
def get_json():
    cursor = mysql.connection.cursor()
    cursor.execute('select sum(cantidad) from operaciones')
    datos = cursor.fetchone()
    miJSON = {"cantidad": datos}
    return jsonify(miJSON)


@app.route('/ayuda')
def ayuda():
    return render_template('ayuda.html')


@app.route('/transferir')
def transferir():
    return render_template('transferir.html')

@app.route('/add', methods=['POST', 'GET'])
def add():
    if request.method == 'GET':
        return("Acción no permitida, redirigiendo... (cuando sepa cómo hacer que quede bien xd)")

    if request.method == 'POST':
        email = request.form['email']
        codigo = request.form['codigo']
        cantidad = request.form['cantidad']
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO operaciones (email, codigo, cantidad) VALUES (%s, %s, %s)', 
        (email, codigo, cantidad))
        flash("Contacto actualizado correctamente")
        mysql.connection.commit()
        cursor.close()
        time.sleep(5)
        return redirect(url_for('transferir'))


@app.route('/admin')
def admin():
    cursor = mysql.connection.cursor()
    cursor.execute('select * from operaciones order by id desc')
    datos = cursor.fetchall()
    print(datos) #nos devuelve una tupla con los datos
    return render_template('admin.html', listado = datos)

@app.route('/edit')
def edit():
    return 'a'

@app.route('/eliminar/<string:id>')
def eliminar(id):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE from operaciones where id = %s", id) # otra forma: "...id = {0}".format(id)
    mysql.connection.commit()
    flash("Registro eliminado")
    cursor.close()
    return redirect(url_for('admin'))

# -- - -- - - -

if __name__ == '__main__':
    app.run(port = 3000, debug = True)

import web

render = web.template.render('templates/')

db = web.database(dbn='mysql', db='webpy_test', user='your_user', pw='your_pwd')

urls = (
    '/', 'index',
    '/add', 'add'
    #'/(.*)', 'index'
)

class index:

    def GET(self):
        todos = db.select('todo_test')
        return render.index(todos)

    #def GET(self):
        #name = 'Steve'
        #return render.index(name)
        #return "Hello, world"
        #i = web.input(name=None)
        #return render.index(i.name)

    #def GET(self, name):
        #return render.index(name)

class add:
    def POST(self):
        i = web.input()
        n = db.insert('todo_test', title=i.title)
        raise web.seeother('/')

if __name__ == "__main__":
    print "Running webserver..."
    app = web.application(urls, globals())
    app.run()


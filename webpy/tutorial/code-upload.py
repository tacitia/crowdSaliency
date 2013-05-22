import web

render = web.template.render('templates/')

db = web.database(dbn='mysql', user='root', pw='goredsox', db='webpy_test')

urls = (
    '/upload', 'Upload'
)

class Upload:

    def GET(self):
        return """<html><head></head><body>
        <form method="POST" enctype="multipart/form-data" action="">
        <input type="file" name="myfile" />
        <br/>
        <input type="submit" />
        </form>
        </body></html>"""

    def POST(self):
        x = web.input(myfile={})
        web.debug(x['myfile'].filename) # This is the filename
        #web.debug(x['myfile'].value) # This is the file contents
        #web.debug(x['myfile'].file.read()) # Or use a file(-like) object

        # Try writing the uploaded file to this server
        f = open('../' + x['myfile'].filename, 'w')
        f.write(x['myfile'].value)

        raise web.seeother('/upload')

class add:
    def POST(self):
        i = web.input()
        n = db.insert('todo_test', title=i.title)
        raise web.seeother('/')

if __name__ == "__main__":
    print "Running webserver..."
    app = web.application(urls, globals())
    app.run()


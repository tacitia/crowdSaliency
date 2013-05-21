import web
import view, config
from view import render

urls = (
    '/', 'index',
    '/request', 'Request'
)

class index:
    def GET(self):
        return render.base(render.request(), 'SearchParty')
        #return render.base(view.listing())

'''        
    def POST(self):
        x = web.input(myfile={})
        web.debug(x['myfile'].filename) # This is the filename
        #web.debug(x['myfile'].value) # This is the file contents
        #web.debug(x['myfile'].file.read()) # Or use a file(-like) object

        # Try writing the uploaded file to this server
        f = open('../' + x['myfile'].filename, 'w')
        f.write(x['myfile'].value)
        raise web.seeother('/upload')
'''
        
if __name__ == "__main__":
    app = web.application(urls, globals())
    app.internalerror = web.debugerror
    app.run()
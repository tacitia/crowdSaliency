import web
import view, config, model

from view import render

urls = (
    '/', 'index',
    '/request', 'Request'
)

class index:
    def GET(self):        
        return render.base(render.request(), 'SearchParty')
        #return render.base(view.listing())
       
    def POST(self):
        web.debug('Post request received')

class Request:
    def GET(self):
        print 'Loading request page'
        return render.base(render.request(), 'SearchParty')
    
    def POST(self):
        print 'Posting request page'
        
        upload = web.input(bigImage={}, sampleImage={})
        print (upload.contact, upload.instructions, 
                upload.bigImage.filename, upload.sampleImage.filename)
        
        if upload['contact'] and upload['instructions'] and upload.bigImage.filename:
            # write fields to db
            model.insert_request(upload['contact'], upload['instructions'])
            
            # write file to server
            filepath = upload.bigImage.filename.replace('\\','/') # correct Windows-style paths
            filename = filepath.split('/')[-1] # grab the filename with extension
            model.write_file(filename, '..', upload.bigImage.file)
            
            # write sample image to server IF provided
            if upload.sampleImage.filename:
                filepath = upload.sampleImage.filename.replace('\\','/') # correct Windows-style paths
                filename = filepath.split('/')[-1] # grab the filename with extension
                model.write_file(filename, '..', upload.sampleImage.file)
            
        raise web.seeother('/request')
        
if __name__ == "__main__":
    app = web.application(urls, globals())
    app.internalerror = web.debugerror
    app.run()
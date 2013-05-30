import web
import model
import config

t_globals = dict(
  datestr=web.datestr,
)
render = web.template.render('templates/', cache=config.cache, 
    globals=t_globals)
render._keywords['globals']['render'] = render

def listing(**k):
    l = db.listing(**k)
    return render.listing(l)
    
def insert_request(contact, instructions):
    db.insert_request(contact, instructions)

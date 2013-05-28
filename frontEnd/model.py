import config, datetime

def listing(**k):
    return config.DB.select('requests', **k)
    
def insert_request(contact, instructions):
    config.DB.insert('requests', contact=contact, instructions=instructions)
        
def insert_request_debug(contact, instructions):
    print config.DB.insert('requests', contact=contact, instructions=instructions, _test=True)
    
def write_file(filename, filedir, the_file):
    # Try writing the file to the server
    fout = open(filedir + '/' + filename, 'w')
    fout.write(the_file.read())
    fout.close()
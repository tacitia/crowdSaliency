import os, config, datetime

def listing(**k):
    return config.DB.select('requests', **k)
    
def insert_request(contact, instructions):
    config.DB.insert('requests', contact=contact, instructions=instructions)
    last_id_query = config.DB.query('SELECT LAST_INSERT_ID();')
    
    # Return the uid of the new request if it exists
    if last_id_query:
        return last_id_query[0]["LAST_INSERT_ID()"]
    else:
        return False
        
def insert_request_debug(contact, instructions):
    print config.DB.insert('requests', contact=contact, instructions=instructions, _test=True)
    
def write_file(filename, filedir, the_file):
    # Try writing the file to the server
    fout = open(filedir + '/' + filename, 'w')
    fout.write(the_file.read())
    fout.close()
    
def mkdir_storage_unless_exists(store, uid):
    d = store + '/' + 'req_' + str(uid)
    if not os.path.exists(d):
        os.makedirs(d)
        
    return d
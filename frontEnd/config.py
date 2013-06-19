import web

# Database credentials
DB = web.database(dbn='mysql', db='crowdvis', user='root', pw='')
cache = False

# Email service credentials
gmail_user = "searchparty.reply@gmail.com"
gmail_pwd = "partytime401"
external_notify_address = "steveg@cs.brown.edu"

# Request storage location
request_store = "../x_test"
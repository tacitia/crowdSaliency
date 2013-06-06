import smtplib, config

gmail_user = config.gmail_user
gmail_pwd = config.gmail_pwd
external_address = config.external_notify_address
request_confirm_url = "http://0.0.0.0:1234/doconfirm"

FROM = gmail_user
SUBJECT = "Confirm your SearchParty request"
NOTIFY_SUBJECT = "New SearchParty request confirmed"

def get_email_text(contact, id):
    return """\
Welcome to SearchParty!
Please visit the following URL in your browser to confirm your request and start your search! You must confirm your request before we continue.
If you believe you received this email in error, you may delete this message; you will not notified again.

Confirm your search: %s?contact="""%(request_confirm_url)+contact+"&req_id="+str(id)+"""

We'll send you an email once the search is finished!

-------
SearchParty

"""

def get_notify_email_text(contact, id):
    return """\
A new SearchParty request has bee submitted and confirmed.

Contact: """+contact+"""
Request ID: """+str(id)+"""

-------
SearchParty

"""

def send_mail(to_address, request_id):
    TO = [to_address]
    text = get_email_text(to_address, request_id)
    # Prepare actual message    
    message = "From: %s\nTo: %s\nSubject: %s\n\n%s" % (FROM, ", ".join(TO), SUBJECT, text)

    # Send the mail
    smtpserver = smtplib.SMTP("smtp.gmail.com", 587)
    smtpserver.ehlo()
    smtpserver.starttls()
    smtpserver.ehlo
    smtpserver.login(gmail_user, gmail_pwd)

    smtpserver.sendmail(FROM, ", ".join(TO), message)    
    smtpserver.close()

def notify_confirmation(to_address, request_id):
    TO = [external_address]
    text = get_notify_email_text(to_address, request_id)
    # Prepare actual message    
    message = "From: %s\nTo: %s\nSubject: %s\n\n%s" % (FROM, ", ".join(TO), NOTIFY_SUBJECT, text)

    # Send the mail
    smtpserver = smtplib.SMTP("smtp.gmail.com", 587)
    smtpserver.ehlo()
    smtpserver.starttls()
    smtpserver.ehlo
    smtpserver.login(gmail_user, gmail_pwd)

    smtpserver.sendmail(FROM, ", ".join(TO), message)
    smtpserver.close()

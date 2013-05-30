import smtplib, config


gmail_user = config.gmail_user
gmail_pwd = config.gmail_pwd
request_confirm_url = "http://www.yahoo.com"

FROM = gmail_user
SUBJECT = "Confirm your SearchParty request"

TEXT = """\
Welcome to SearchParty!
Please visit the following URL in your browser to confirm your request and start your search! You must confirm your request before we continue.
If you believe you received this email in error, you may delete this message; you will not notified again.

Confirm your search: %s

We'll send you an email once the search is finished!

-------
SearchParty

""" % (request_confirm_url)

def send_mail(to_address):
    TO = [to_address]
    # Prepare actual message    
    message = "From: %s\nTo: %s\nSubject: %s\n\n%s" % (FROM, ", ".join(TO), SUBJECT, TEXT)

    # Send the mail

    smtpserver = smtplib.SMTP("smtp.gmail.com", 587)
    smtpserver.ehlo()
    smtpserver.starttls()
    smtpserver.ehlo
    smtpserver.login(gmail_user, gmail_pwd)

    smtpserver.sendmail(FROM, ", ".join(TO), message)
    print 'Message sent!'
    print 'From: ', FROM
    print 'To: ', to_address
    print 'Sub: ', SUBJECT
    print 'Text: ', TEXT
    
    smtpserver.close()


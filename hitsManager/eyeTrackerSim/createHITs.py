import sys
import getopt
import subprocess

opts,extraargs = getopt.getopt(sys.argv[1:], 'u:bsraldm')

fullUrl = 'none'
imgBound = 'default'
unitImgSize = 'default'
reward = 'default'
autoApproval = 'default'
lifeTime = 'default'
duration = 'default'
maxAssigns = 'default'

for o,p in opts:
	if o in ['-u', '--fullUrl']:
		fullUrl = p	
	elif o in ['-b', '--imgBound']:
		imgBound = p
	elif o in ['-s', '--unitImgSize']:
		unitImgSize = p
	elif o in ['-r', '--reward']:
		reward = p
	elif o in ['-a', '--autoApproval']:
		autoApproval = p
	elif o in ['-l', '--lifeTime']:
		lifeTime = p
	elif o in ['-d', '--duration']:
		duration = p
	elif o in ['-m', '--maxAssigns']:
		maxAssigns = p

if fullUrl is 'none':
	print "missing required parameter: external page URL (use -u to specify)"
	sys.exit()
	
var = fullUrl + ';' + imgBound + ';' + unitImgSize + ';' + reward + ';' + autoApproval + ';' + lifeTime + ';' + duration + ';' + maxAssigns
pipe = subprocess.Popen(["perl", "./createHits.pl", var], stdin=subprocess.PIPE)
pipe.wait()
pipe.stdin.close()
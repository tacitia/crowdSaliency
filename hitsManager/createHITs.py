import sys
import getopt
import subprocess

opts,extraargs = getopt.getopt(sys.argv[1:], 'i:b:s:r:a:l:d:m:')

requestId = 'none'
imgBound = 'default'
unitImgSize = 'default'
reward = 'default'
autoApproval = 'default'
lifeTime = 'default'
duration = 'default'
maxAssigns = 'default'

print opts

for o,p in opts:
	if o in ['-i', '--requestId']:
		requestId = p	
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

if requestId is 'none':
	print "missing required parameter: requestId"
	sys.exit()
	
var = requestId + ';' + imgBound + ';' + unitImgSize + ';' + reward + ';' + autoApproval + ';' + lifeTime + ';' + duration + ';' + maxAssigns
pipe = subprocess.Popen(["perl", "./createHits.pl", var], stdin=subprocess.PIPE)
pipe.wait()
pipe.stdin.close()
import sys
import getopt
import subprocess

opts,extraargs = getopt.getopt(sys.argv[1:], 'i:')

requestId = 'none'

for o,p in opts:
	if o in ['-i', '--requestId']:
		requestId = p

if requestId is 'none':
	print "missing required parameter: requestId"
	sys.exit()
	
var = requestId
pipe = subprocess.Popen(["perl", "./cancelHits.pl", var], stdin=subprocess.PIPE)
pipe.wait()
pipe.stdin.close()
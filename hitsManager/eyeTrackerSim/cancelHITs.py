import sys
import getopt
import subprocess

opts,extraargs = getopt.getopt(sys.argv[1:], 'u:')

fullUrl = 'none'

for o,p in opts:
	if o in ['-u', '--fullUrl']:
		fullUrl = p

if fullUrl is 'none':
	print "missing required parameter: external page URL (use -u to specify)"
	sys.exit()
	
var = fullUrl
pipe = subprocess.Popen(["perl", "./cancelHITs.pl", var], stdin=subprocess.PIPE)
pipe.wait()
pipe.stdin.close()
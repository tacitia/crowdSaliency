#!/usr/bin/perl
use strict;
use warnings;
use Net::Amazon::MechanicalTurk;
use Net::Amazon::MechanicalTurk::IOUtil;
use URI::Escape;

# incoming parameters
my @params = split(';', $ARGV[0]);

# Required parameters
my $fullUrl = $params[0];

my $mturk = Net::Amazon::MechanicalTurk->new();
    
# Try and remove all hits
print "Expiring and disposing all hits for page " . $fullUrl . ".....\n";
my $hits = $mturk->SearchHITsAll;
my $autoApprove = 1;

while (my $hit = $hits->next) {
    my $hitId = $hit->{HITId}[0];
    if ($hit->{RequesterAnnotation}[0] eq $fullUrl) {    
	    print "Deleting hit $hitId\n";
	    eval {
	        $mturk->deleteHIT($hitId, $autoApprove);
	    };
    	warn $@ if $@;
    }
}
#!/usr/bin/perl
use strict;
use warnings;
use Net::Amazon::MechanicalTurk;
use Net::Amazon::MechanicalTurk::IOUtil;
use URI::Escape;

# incoming parameters
my @params = split(';', $ARGV[0]);

# Required parameters
my $requestId = $params[0];

# Optional parameters
my $rewardPerHit = ($params[3] eq 'default') ? 0.00 : $params[3];
my $autoApprovalInMinutes = ($params[4] eq 'default') ? 60 * 24 : $params[4];
my $lifetimeInMinutes = ($params[5] eq 'default') ? 60 * 24 * 7 : $params[5];
my $durationInMinutes = ($params[6] eq 'default') ? 60 : $params[6];
my $maxAssigns = ($params[7] eq 'default') ? 1 : $params[7];


# Fixed parameters
my $hitTitle = 'Image Saliency';
my $hitDescription = 'In this HIT, you will be asked to search for a specific type of objects by exploraing a large image.';
my $hitKeywords = 'image, exploration, citizen science';
my $baseUrl = 'http://crowdvis.cs.brown.edu/crowdSaliency/googleMap/map-sky-test.html';

# parameters derived on top of basic inputs
my $requestPath = uri_escape($requestId);
my $fullUrl = $baseUrl . '?' . 'requestpath=' . $requestPath;
my $question = '<ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">'
				. '<ExternalURL>'
				. $fullUrl
				. '</ExternalURL>'
				. '<FrameHeight>800</FrameHeight>'
				. '</ExternalQuestion>';


my $mturk = Net::Amazon::MechanicalTurk->new;

my $result = $mturk->CreateHIT(
    Title       => $hitTitle,
    Description => $hitDescription,
    Keywords    => $hitKeywords,
    Reward => {
        CurrencyCode => 'USD',
        Amount       => $rewardPerHit
    },
    Question => $question,
    RequesterAnnotation         => $requestId,
    AssignmentDurationInSeconds => 60 * $durationInMinutes,
    AutoApprovalDelayInSeconds  => 60 * $autoApprovalInMinutes,
    MaxAssignments              => $maxAssigns,
    LifetimeInSeconds           => 60 * $lifetimeInMinutes,
);

printf "Created HIT:\n";
printf "HITId:     %s\n", $result->{HITId}[0];
printf "HITTypeId: %s\n", $result->{HITTypeId}[0];

printf "\nYou may see your hit here: %s\n", $mturk->getHITTypeURL($result->{HITTypeId}[0]);

# Write out the HITId to a text file in order to get 
# the answer in the helloworld-answer.pl script.
Net::Amazon::MechanicalTurk::IOUtil->writeContents(
    "hitid.txt", $result->{HITId}[0]
);
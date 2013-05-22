#!/usr/bin/perl
use strict;
use warnings;
use Net::Amazon::MechanicalTurk;
use Net::Amazon::MechanicalTurk::IOUtil;

# These variables should later be passed in as program parameters or derived based on parameters.
my $rewardPerHit = 0.00;
my $lifetimeInMinutes = 60 * 24 * 7;
my $durationInMinutes = 60;
my $maxAssigns = 1;
my $requestId = 'crowdSaliency_007';
my $url = 'http://crowdvis.cs.brown.edu';
my $question = '<ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">'
				. '<ExternalURL>'
				. $url
				. '</ExternalURL>'
				. '<FrameHeight>800</FrameHeight>'
				. '</ExternalQuestion>';

# These variables are probably going to be the same for all our hits.
my $hitTitle = 'Image Saliency';
my $hitDescription = 'In this HIT, you will be asked to search for a specific type of objects by exploraing a large image.';
my $hitKeywords = 'image, exploration, citizen science';
my $autoApprovalInMinutes = 60 * 24;

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

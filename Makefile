#
# Makefile for installing SearchParty components onto
# a web server.
#
# steveg@cs.brown.edu
#

WEBDIR = /vol/web/html/
TARGETDIR = crowdSaliency/
INSTALLDIR = $(WEBDIR)$(TARGETDIR)

# Components to install
FRONT_END = frontEnd
HIT_MANAGER = googleMap

COMPONENTS = $(FRONT_END) $(HIT_MANAGER)

hello:
	@echo Use 'make install' to install all \
	components to $(INSTALLDIR)

# install all SearchParty components
install: install-all

install-all:
	for component in $(COMPONENTS) ; do \
		cp -r $$component $(INSTALLDIR) ; \
	done
	
install-hits:
	@echo ---------installing HIT templates
	cp -r $(FRONT_END) $(INSTALLDIR)
	
install-front:
	@echo ---------installing front end
	cp -r $(HIT_MANAGER) $(INSTALLDIR)

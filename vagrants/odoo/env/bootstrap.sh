# Install Odoo (open crm) from .deb - does not work
#wget -O - https://nightly.odoo.com/odoo.key | apt-key add -
#echo "deb http://nightly.odoo.com/8.0/nightly/deb/ ./" >> /etc/apt/sources.list
#apt-get update && apt-get install odoo -y

#git clone https://github.com/odoo/odoo.git
#sudo su - postgres -c "createuser -s $USER"
#cd odoo
#pip install -r requirements.txt

wget https://raw.githubusercontent.com/lukebranch/openerp-install-scripts/master/odoo-saas4/ubuntu-14-04/odoo_install.sh
sudo sh odoo_install.sh

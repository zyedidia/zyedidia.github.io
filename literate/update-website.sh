cd /home/zbyedidia/Literate
git pull
make d-files

/home/zbyedidia/webapps/literate/binaries/compile-binaries.sh
make debug
/home/zbyedidia/webapps/literate/literate-source/update.sh

git-archive-all
gzip -c Literate.tar > literate.tar.gz
mv literate.tar.gz /home/zbyedidia/webapps/literate/binaries

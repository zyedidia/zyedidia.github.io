cd /home/zbyedidia/Literate

dub build
strip bin/lit
cd bin
tar -czvf literate-linux64.tar.gz lit
mv literate-linux64.tar.gz ~/webapps/literate/binaries
cd ..
dub build --compiler=/home/zbyedidia/gdc/arm-unknown-linux-gnueabi/bin/arm-linux-gnueabi-gdc
/home/zbyedidia/gdc/arm-unknown-linux-gnueabi/bin/arm-linux-gnueabi-strip bin/lit
cd bin
tar -czvf literate-linux-arm.tar.gz lit
mv literate-linux-arm.tar.gz ~/webapps/literate/binaries
cd ..
# dub build --compiler=/home/zbyedidia/gdc/arm-unknown-linux-gnueabihf/bin/arm-linux-gnueabihf-gdc
# /home/zbyedidia/gdc/arm-unknown-linux-gnueabihf/bin/arm-linux-gnueabihf-strip bin/lit
# mv bin/lit bin/lit_armbihf
dub build --compiler=/home/zbyedidia/gdc/i686-pc-linux-gnu/bin/i686-linux-gnu-gdc
strip bin/lit
cd bin
tar -czvf literate-linux32.tar.gz lit
mv literate-linux32.tar.gz ~/webapps/literate/binaries
cd ..

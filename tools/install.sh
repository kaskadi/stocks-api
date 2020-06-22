# Dev Server
echo "installing dev-server"
echo "changing directory"
cd tools/dev-server
echo $(pwd)
echo "installing dependencies"
npm i
echo "done"
echo "cleaning up"
cd ../..
echo $(pwd)
# Layer
echo "installing layer"
echo "changing directory"
cd layer/nodejs
echo $(pwd)
echo "installing dependencies"
npm i
echo "done"
echo "cleaning up"
cd ../..
echo $(pwd)

# load env
source .env

if ! [[ -d $VITE_SKETCHES_DIR ]]
then
  echo "sketches dir not found"
  exit 1
fi

echo "this script will nuke the sketches directory (y/n)."
read answer

if [ "$answer" != "${answer#[Yy]}" ] ;then 
  rm -rf "./$VITE_SKETCHES_DIR"
else
  echo "canceled."
fi
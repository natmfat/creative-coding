set -e

# load env
source .env

if ! [[ -d $VITE_SKETCHES_DIR ]]
then
  echo "sketches dir not found"
  exit 1
fi

# ensure fork base exists
template="./sketches/$1"
if ! [[ -d $template ]]; then
  echo "sketch $1 does not exist"
  exit 1
fi

# create random directory
number=""
for i in {0..5} 
do
  random=$((RANDOM % 9))
  number="$number$random"
done

dir="./$VITE_SKETCHES_DIR/$number"
mkdir $dir

# copy starter files
cp -a "$template/." "$dir/"

echo "created sketch $number"
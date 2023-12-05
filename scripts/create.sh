set -e

# load env
source .env

TEMPLATE="template.html"

# create random directory
number=""
for i in {0..5} 
do
  random=$((RANDOM % 9))
  number="$number$random"
done

dir="./$VITE_SKETCHES_DIR/$number"

# @todo check if directory exists first
mkdir $dir

# add starter files
cat $TEMPLATE > $dir/index.html
touch "$dir/sketch.ts"

echo "created sketch $number"
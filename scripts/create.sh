set -e

# load env
source .env

if ! [[ -d $VITE_SKETCHES_DIR ]]
then
  echo "sketches dir not found"
  exit 1
fi

TEMPLATE="template.html"

# create random directory
dir="./$VITE_SKETCHES_DIR/$1"
if ! [[ $# -gt 0  ]]; then
    number=""
    for i in {0..5}
    do
    random=$((RANDOM % 9))
    number="$number$random"
    done

    dir="./$VITE_SKETCHES_DIR/$number"
fi

# @todo check if directory exists first
mkdir $dir

# add starter files
cat $TEMPLATE > $dir/index.html
touch "$dir/sketch.ts"

echo "created sketch $dir"

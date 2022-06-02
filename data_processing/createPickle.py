# Source: https://machinelearningmastery.com/how-to-load-and-manipulate-images-for-deep-learning-in-python-with-pil-pillow/ [16.12.2021]
# Source: https://www.youtube.com/watch?v=j-3vuBynnOE&t=195s [16.12.2021]
# Source: https://stackoverflow.com/questions/902761/saving-a-numpy-array-as-an-image [17.12.2021]
# Source: https://stackoverflow.com/questions/16476924/how-to-iterate-over-rows-in-a-dataframe-in-pandas [17.12.2021]
# Source: https://thispointer.com/python-get-list-of-files-in-directory-sorted-by-name/ [20.12.2021]
import os
import cv2
import pandas as pd
import numpy as np
from PIL import Image
import pickle

game = 'cs13'
folder = ['828', '20828', '40828', '60828', '66317', '86317', '106317', '126317', '131801']
width = 60
height = 34

# Itterate over all folder
for i in range(len(folder)):
    training_data = []
    path = 'E:/demo_converted/' + game + '_' + folder[i] + '/'
    #Itterate over all pictueres, read and preprocess them
    for img in sorted(os.listdir(path)):
        img_array = cv2.imread(os.path.join(path, img), cv2.IMREAD_GRAYSCALE)
        img_array = cv2.resize(img_array, (width, height))
        filename = img.replace(game + '_', '')
        filename = filename.replace('.png', '')
        training_data.append([img_array, int(filename)])

    # Prepare frame with every tickcount that should be saved
    tick_df = pd.DataFrame()
    tick_path = 'E:/BA/json files/' + game + '/' + game + '_input_ticks.json'
    tick_df = pd.read_json(tick_path)
    tick_df = tick_df.rename(columns={0: 'tickCount'})
    tick_df['notNAN'] = tick_df['tickCount']
    tick_df = tick_df.set_index('tickCount')
    tick_df = tick_df[~tick_df.index.duplicated(keep='first')]

    img_df = pd.DataFrame(training_data, columns=['image', 'tickCount'])
    img_df = img_df.set_index('tickCount')

    # put the tick_df and training_data together and remove the unwanted
    df = pd.concat([img_df, tick_df], axis=1)
    df = df.dropna()
    df = df.sort_index()
    df = df.drop(['notNAN'], axis=1)

    print(len(df))

    training_data = []

    # save data in numpy array
    for index, row in df.iterrows():
        im = np.array(Image.fromarray(row['image']))
        training_data.append(im)

    # save data in a pickle; protocol=2 due to colab
    pickle.dump(training_data, open('G:/Meine Ablage/ba_pickle/'
                + game + '_' + folder[i] + '_' + str(width) + 'x' + str(height)
                + '.pkl', 'wb'), protocol=(2))

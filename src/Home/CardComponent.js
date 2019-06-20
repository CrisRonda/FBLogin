import React from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default props => {
    const { urlUser, title, userName, urlImage, functionAddLikes, likes } = props;
    return <Card>
        <CardItem>
            <Left>
                <Thumbnail source={{ uri: urlUser }} />
                <Body>
                    <Text style={{ fontSize: 24, color: 'black' }}>{title}</Text>
                    <Text note style={{ fontSize: 16, color: 'grey', fontWeight: '400' }}>{userName}</Text>
                </Body>
            </Left>
        </CardItem>
        <CardItem cardBody>
            <Image source={{ uri: urlImage }} style={{ height: 200, width: null, flex: 1, resizeMode:'contain' }} />
        </CardItem>
        <CardItem>
            <Left>
                <Button transparent onPress={functionAddLikes}>
                    <Icon type="SimpleLineIcons" name="like" />
                    <Text>{`${likes} likes`}</Text>
                </Button>
            </Left>
            <Body>
                <Button transparent>
                    <Icon name="chatbubbles" />
                    <Text>4 Comments</Text>
                </Button>
            </Body>
            <Right>
                <Text>11h ago</Text>
            </Right>
        </CardItem>
    </Card>

}
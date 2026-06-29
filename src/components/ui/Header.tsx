import { Image } from "expo-image";
import { View } from 'react-native'

const Header = () => {
    return (
        <View className='flex flex-row justify-between pt-16 gap-6'>
            <View className='border border-primary rounded-full py-2 px-4 flex-1'>
                <Image
                    source={require("../../../assets/icons/icon_search.png")}
                    style={{
                        width: 26,
                        height: 26,
                    }}
                    contentFit="contain"
                />
            </View>
            <View className="flex justify-center items-center">
                <Image
                    source={require("../../../assets/icons/icon_notif.png")}
                    style={{
                        width: 34,
                        height: 34,
                    }}
                    contentFit="contain"
                />
            </View>
        </View>
    )
}

export default Header
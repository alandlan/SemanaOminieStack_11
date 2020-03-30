import React from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const route =useRoute();
    const incident = route.params.incident;
    const message = 'Teste body';

    function navigationBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.tittle}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#e02041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.tittle}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTittle}>Salve o dia!</Text>
                <Text style={styles.heroTittle}>seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity onPress={sendWhatsApp} style={styles.action}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>    
                
                    <TouchableOpacity onPress={sendMail} style={styles.action}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>    
                </View> 

            </View>
            
        </View>
    )
}

import '../scss/editor.scss'

import { useBlockProps } from '@wordpress/block-editor'
import { useEffect, useState } from '@wordpress/element'

import Map from './components/Map'

export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps()

  useEffect(() => {
    setAttributes({ blockId: blockProps.id })
  }, [])

  const testDatas = {
    filters: {
      type: {
        title: "Type d'établissements",
        style: 'col2',
        values: [
          {
            id: '1',
            name: 'Restaurant',
            color: '#ce752d',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 38" style="enable-background:new 0 0 32 38;" xml:space="preserve"><path id="gauche" class="svg__type" d="M16,1.2C7.7,1.3,1,8.1,1,16.4c0,6,3.4,11.2,8.5,13.7h0c2.4,1.2,4.7,3.4,6.5,6.7V1.2z"/><path id="droite" class="svg__type" d="M16.1,1.2C16,1.2,16,1.2,16.1,1.2L16,36.8c0,0,0,0.1,0.1,0.1c1.9-3.4,4.1-5.6,6.6-6.8h0c5-2.5,8.5-7.7,8.5-13.7C31.1,8,24.4,1.2,16.1,1.2z"/><circle id="centre" class="svg__type" cx="16" cy="16.3" r="5.8"/></svg>'
          },
          {
            id: '2',
            name: 'Museum',
            color: '#FF0000',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 38" style="enable-background:new 0 0 32 38;" xml:space="preserve"><path id="gauche" class="svg__type" d="M16,1.2C7.7,1.3,1,8.1,1,16.4c0,6,3.4,11.2,8.5,13.7h0c2.4,1.2,4.7,3.4,6.5,6.7V1.2z"/><path id="droite" class="svg__type" d="M16.1,1.2C16,1.2,16,1.2,16.1,1.2L16,36.8c0,0,0,0.1,0.1,0.1c1.9-3.4,4.1-5.6,6.6-6.8h0c5-2.5,8.5-7.7,8.5-13.7C31.1,8,24.4,1.2,16.1,1.2z"/><circle id="centre" class="svg__type" cx="16" cy="16.3" r="5.8"/></svg>'
          },
          {
            id: '3',
            name: 'Library',
            color: '#0000FF',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 38" style="enable-background:new 0 0 32 38;" xml:space="preserve"><path id="gauche" class="svg__type" d="M16,1.2C7.7,1.3,1,8.1,1,16.4c0,6,3.4,11.2,8.5,13.7h0c2.4,1.2,4.7,3.4,6.5,6.7V1.2z"/><path id="droite" class="svg__type" d="M16.1,1.2C16,1.2,16,1.2,16.1,1.2L16,36.8c0,0,0,0.1,0.1,0.1c1.9-3.4,4.1-5.6,6.6-6.8h0c5-2.5,8.5-7.7,8.5-13.7C31.1,8,24.4,1.2,16.1,1.2z"/><circle id="centre" class="svg__type" cx="16" cy="16.3" r="5.8"/></svg>'
          },
          {
            id: '4',
            name: 'Boulangerie',
            color: '#FFFF00',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 38" style="enable-background:new 0 0 32 38;" xml:space="preserve"><path id="gauche" class="svg__type" d="M16,1.2C7.7,1.3,1,8.1,1,16.4c0,6,3.4,11.2,8.5,13.7h0c2.4,1.2,4.7,3.4,6.5,6.7V1.2z"/><path id="droite" class="svg__type" d="M16.1,1.2C16,1.2,16,1.2,16.1,1.2L16,36.8c0,0,0,0.1,0.1,0.1c1.9-3.4,4.1-5.6,6.6-6.8h0c5-2.5,8.5-7.7,8.5-13.7C31.1,8,24.4,1.2,16.1,1.2z"/><circle id="centre" class="svg__type" cx="16" cy="16.3" r="5.8"/></svg>'
          },
          {
            id: '5',
            name: 'Cinema',
            color: '#00FFFF',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 38" style="enable-background:new 0 0 32 38;" xml:space="preserve"><path id="gauche" class="svg__type" d="M16,1.2C7.7,1.3,1,8.1,1,16.4c0,6,3.4,11.2,8.5,13.7h0c2.4,1.2,4.7,3.4,6.5,6.7V1.2z"/><path id="droite" class="svg__type" d="M16.1,1.2C16,1.2,16,1.2,16.1,1.2L16,36.8c0,0,0,0.1,0.1,0.1c1.9-3.4,4.1-5.6,6.6-6.8h0c5-2.5,8.5-7.7,8.5-13.7C31.1,8,24.4,1.2,16.1,1.2z"/><circle id="centre" class="svg__type" cx="16" cy="16.3" r="5.8"/></svg>'
          },
          {
            id: '6',
            name: 'Cafe',
            color: '#FF00FF',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 38" style="enable-background:new 0 0 32 38;" xml:space="preserve"><path id="gauche" class="svg__type" d="M16,1.2C7.7,1.3,1,8.1,1,16.4c0,6,3.4,11.2,8.5,13.7h0c2.4,1.2,4.7,3.4,6.5,6.7V1.2z"/><path id="droite" class="svg__type" d="M16.1,1.2C16,1.2,16,1.2,16.1,1.2L16,36.8c0,0,0,0.1,0.1,0.1c1.9-3.4,4.1-5.6,6.6-6.8h0c5-2.5,8.5-7.7,8.5-13.7C31.1,8,24.4,1.2,16.1,1.2z"/><circle id="centre" class="svg__type" cx="16" cy="16.3" r="5.8"/></svg>'
          }
        ]
      },
      category: {
        title: "Type d'activité",
        style: 'colAuto',
        values: [
          {
            id: '1',
            name: 'ISDND',
            color: '#000000',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve"><g><path d="M9.3,14.6v14.3c0,0.5,0.4,0.8,0.8,0.8h14.7c0.5,0,0.8-0.4,0.8-0.8V14.6c0-0.5-0.4-0.8-0.8-0.8H10.2C9.7,13.8,9.3,14.2,9.3,14.6z M14.3,26.7H12v-9.8h2.3V26.7z M18.7,26.7h-2.3v-9.8h2.3V26.7z M23,26.7h-2.3v-9.8H23V26.7z"/><path d="M20.8,7.6V6.1c0-0.5-0.4-0.8-0.8-0.8H15c-0.5,0-0.8,0.4-0.8,0.8v1.5h-4C9.7,7.6,9.3,8,9.3,8.4v2.2c0,0.5,0.4,0.8,0.8,0.8h14.7c0.5,0,0.8-0.4,0.8-0.8V8.4c0-0.5-0.4-0.8-0.8-0.8H20.8z"/></g></svg>'
          },
          {
            id: '2',
            name: 'carrières',
            color: '#FF0000',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve"><g><polygon points="27.9,5.4 30.3,9.4 29.9,16.3 26.7,21.7 24.4,21.6 16.8,15.9 13.7,11.6 14.2,8.9 18.3,5.3 "/><polygon points="16.5,18.2 22.1,22.5 23,25.6 20.8,28.2 15.9,29.7 10.9,26 11.2,20.2 "/><polygon points="14.3,16.6 9.2,18.2 4.7,15.3 5.2,13 5.5,9.6 7.9,8.6 10.5,9.6 "/></g></svg>'
          },
          {
            id: '3',
            name: 'Négoce',
            color: '#0000FF',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve"><g><path id="XMLID_00000098914796158074794730000004108966248322772918_" d="M21.7,14.6l-2.4-2.4l1.6-1.6l8.1,8.1l-11,11c0,0,0,0,0,0c-0.4,0.4-1.2,0.4-1.6,0c-0.2-0.2-0.3-0.5-0.3-0.8c0-0.3,0.1-0.6,0.3-0.8c0,0,0,0,0,0c0,0,0,0,0,0l1.6-1.6c0.4-0.4,0.4-1.2,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l-1.6,1.6c0,0,0,0,0,0c-0.4,0.4-1.2,0.4-1.6,0c-0.4-0.4-0.4-1.2,0-1.6c0,0,0,0,0,0l1.6-1.6c0.4-0.4,0.4-1.2,0-1.6c-0.4-0.4-1.2-0.4-1.6,0l-1.6,1.6c0,0,0,0,0,0c-0.4,0.4-1.2,0.4-1.6,0c0,0,0,0,0,0l0,0c-0.2-0.2-0.3-0.5-0.3-0.8c0-0.3,0.1-0.6,0.3-0.8l0.5-0.5c0,0,0,0,0,0l4-4l2.4,2.4c0,0,0,0,0,0c0.7,0.7,1.5,1,2.4,1c0.9,0,1.8-0.3,2.4-1C23,18.1,23,16,21.7,14.6C21.7,14.6,21.7,14.6,21.7,14.6z"/><path id="XMLID_00000043421695821277495350000010951819340175175307_" d="M16.8,13C16.8,13,16.8,13,16.8,13C16.8,13,16.8,13,16.8,13l3.2,3.2c0,0,0,0,0,0c0.4,0.4,0.4,1.2,0,1.6c-0.4,0.4-1.2,0.4-1.6,0l-3.2-3.2c-0.2-0.2-0.5-0.3-0.8-0.3c-0.3,0-0.6,0.1-0.8,0.3l-4.8,4.8c0,0,0,0,0,0L8.2,20c0,0,0,0,0,0c0,0,0,0,0,0l-0.8,0.8l-1.6-1.6l8.6-8.6L16.8,13z"/><rect x="26.4" y="8.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.758 23.153)" width="2.3" height="8.3"/><rect x="3.3" y="11.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.8461 8.9916)" width="8.3" height="2.3"/></g></svg>'
          },
          {
            id: '4',
            name: 'K3+ (seuil inerte x3)',
            color: '#FFFF00',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve"><g><circle cx="6.1" cy="18.6" r="2.4"/><polygon points="7,10.1 12.5,18.6 16,17.4 9.4,8.4 "/><path d="M21.5,17.1l-4.3,12l4.3,4.1l5.2-5.4c0,0,0.7-3.7,0-4.9s-1.9-3.3-1.9-3.3L21.5,17.1z"/><path d="M11.4,22.9l1.8,0.5l-0.5,3.1l-1.2,2.7c0,0-1.5-0.7-1.9-0.8c-0.4-0.1-1.1-1.5-1.1-1.5l0.4-2L11.4,22.9z"/><path d="M19.9,10.2c0,0,0.8,2.4,0.9,2.6s2.1,0.7,2.1,0.7l1.4-0.7c0,0,0.8-1.4,0.8-2c-0.1-0.5-0.2-1.6-0.4-1.6c-0.2,0-1.3-0.5-1.3-0.5l-1.8,1.1L19.9,10.2z"/><polygon points="29.2,10.6 27.7,14.2 28.4,18 31.3,10.6 "/><path d="M14.9,8.3c0.4,0.3,1.8,0.8,1.8,0.8l1.9-1.3l0.2-2.4l-1.1-1.1L16.3,3l-2.1-1.3c0,0-1,0.6-1,1.1s0.2,1.8,0.2,1.8S14.5,8,14.9,8.3z"/></g></svg>'
          },
          {
            id: '5',
            name: 'Poste Chaud',
            color: '#00FFFF',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve"><g><g id="Flame"><path d="M20.9,28.6c0.9-1.8,1.9-4.8,0.5-6c-1.3,0.2-2.4,0.2-3.3,0c-2.2-0.5-2.9-2.3-2.3-4.5c-3,2.7-3.1,6.8-2,10.7c0.2,0.6-0.5,1.2-1.1,0.8C12.4,29.4,8,26.4,8,21.8c0-7.5,8.5-7.9,8.5-15.7c0-0.6,0.7-0.9,1.2-0.5c3.4,2.9,9.6,9.7,9.3,16.1c-0.2,3.1-1.9,5.8-5.1,7.9C21.3,29.9,20.6,29.3,20.9,28.6z"/></g></g></svg>'
          },
          {
            id: '6',
            name: 'Poste froid',
            color: '#FF00FF',
            icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 35" style="enable-background:new 0 0 35 35;" xml:space="preserve"><path d="M30.2,20.1c-0.2-0.8-1.1-1.3-1.9-1.1l-3.6,1L22,18.3c0.1-0.3,0.1-0.6,0.1-0.8c0-0.3,0-0.6-0.1-0.8l2.8-1.6l3.6,1c0.1,0,0.3,0.1,0.4,0.1c0.7,0,1.3-0.5,1.5-1.1c0.2-0.8-0.3-1.7-1.1-1.9l-2.7-0.7l0.7-2.7c0.2-0.8-0.3-1.7-1.1-1.9c-0.8-0.2-1.7,0.3-1.9,1.1l-1,3.6L20.5,14c-0.4-0.4-0.9-0.6-1.4-0.8V10l2.6-2.6c0.6-0.6,0.6-1.6,0-2.2c-0.6-0.6-1.6-0.6-2.2,0l-2,2l-2-2c-0.6-0.6-1.6-0.6-2.2,0c-0.6,0.6-0.6,1.6,0,2.2L16,10v3.2c-0.5,0.2-1,0.5-1.4,0.8l-2.8-1.6l-1-3.6C10.6,8,9.7,7.5,8.9,7.8C8.1,8,7.6,8.8,7.8,9.6l0.7,2.7l-2.7,0.7c-0.8,0.2-1.3,1.1-1.1,1.9c0.2,0.7,0.8,1.1,1.5,1.1c0.1,0,0.3,0,0.4-0.1l3.6-1l2.8,1.6c-0.1,0.3-0.1,0.6-0.1,0.8c0,0.3,0,0.6,0.1,0.8l-2.8,1.6l-3.6-1c-0.8-0.2-1.7,0.3-1.9,1.1c-0.2,0.8,0.3,1.7,1.1,1.9l2.7,0.7l-0.7,2.7c-0.2,0.8,0.3,1.7,1.1,1.9c0.1,0,0.3,0.1,0.4,0.1c0.7,0,1.3-0.5,1.5-1.1l1-3.6l2.8-1.6c0.4,0.4,0.9,0.6,1.4,0.8V25l-2.6,2.6c-0.6,0.6-0.6,1.6,0,2.2c0.6,0.6,1.6,0.6,2.2,0l2-2l2,2c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.6,0-2.2L19,25v-3.2c0.5-0.2,1-0.5,1.4-0.8l2.8,1.6l1,3.6c0.2,0.7,0.8,1.1,1.5,1.1c0.1,0,0.3,0,0.4-0.1c0.8-0.2,1.3-1.1,1.1-1.9l-0.7-2.7l2.7-0.7C30,21.7,30.4,20.9,30.2,20.1L30.2,20.1z M17.5,19c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5C19,18.3,18.3,19,17.5,19z"/></svg>'
          }
        ]
      }
    },
    entities: [
      {
        id: '1',
        name: 'Aquarium',
        longitude: '-0.581842',
        latitude: '44.8416',
        address: '13 Rue Judaique 33000 Bordeaux',
        phone: '+1 (576) 779-2585',
        schedule: '09:30-12:00',
        website: 'https://www.glanum.com/',
        color: ['#AB4519', '#02AEF0'],
        type: ['carrieres', 'Plateforme de materiaux'],
        category: ['Food', 'Culture', 'Poste froid', 'Poste Chaud'],
        typeInfos: [
          {
            name: 'CARRIERES',
            address: '13 Rue Christophe 33000 Bordeaux',
            addressComplement: 'Omer vacance',
            tel: '+33 (576) 779-2585',
            fax: '+1 (576) 779-2585',
            color: '#AB4519',
            email: {
              'salut Cava': 'salut.cava@gmail.com',
              'bien ytu': 'bien.ytu@gmail.com'
            },
            schedule: {
              'Lundi-Jeudi': '09:30-12:00 / 14:30-17:00',
              Vendredi: '09:30-12:00 / 14:30-17:00'
            }
          },
          {
            name: 'USINE DE PREFABRICATION',
            address: '3 Rue Jerem 33000 Avignon',
            addressComplement: 'Glanum',
            tel: '+33 00000000',
            fax: '+1 0000000',
            color: '#02AEF0',
            email: {
              'salut Cava': 'salut.cava@gmail.com',
              'bien ytu': 'bien.ytu@gmail.com'
            },
            schedule: {
              'Lundi-Jeudi': '09:30-13:00 / 14:30-19:00',
              Vendredi: '09:30-12:00 / 14:30-17:00'
            }
          }
        ],
        typesInfosIcon: {
          address: '',
          tel: ''
        },

        fullSchedule: {
          Lundi: '09:30-12:00 / 14:30-17:00',
          Mardi: '09:30-12:00 / 14:30-17:00',
          Mercredi: '09:30-12:00 / ',
          Jeudi: '09:30-12:00 / 14:30-17:00',
          Vendredi: '09:30-12:00',
          Samedi: 'Ferm\u00e9',
          Dimanche: 'Ferm\u00e9'
        },
        picture: 'https://planet-terre.ens-lyon.fr/planetterre/objets/Images/Img471/471-calcaire-carriere-Boulonnais-01.jpg'
      },
      {
        id: '11',
        name: 'Aquarium',
        longitude: '-0.581845',
        latitude: '44.8419',
        address: '13 Rue Judaique 33000 Bordeaux',
        phone: '+1 (576) 779-2585',
        schedule: '09:30-12:00',
        website: 'https://www.lyzahyzubocil.tv',
        color: ['#AC4518', '#03AEEE'],
        type: ['Cafe', 'Cinema'],
        category: ['Food', 'Culture', 'Négoce', 'carrières'],
        fullSchedule: {
          Lundi: '09:30-12:00 / 14:30-17:00',
          Mardi: '09:30-12:00 / 14:30-17:00',
          Mercredi: '09:30-12:00',
          Jeudi: '09:30-12:00 / 14:30-17:00',
          Vendredi: '09:30-12:00',
          Samedi: 'Ferm\u00e9',
          Dimanche: 'Ferm\u00e9'
        },
        picture:
          'data:image/jpeg;base64,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'
      },
      {
        id: '12',
        name: 'Aquarium',
        longitude: '-0.581840',
        latitude: '44.8410',
        address: '13 Rue Judaique 33000 Bordeaux',
        phone: '+1 (576) 779-2585',
        schedule: '09:30-12:00',
        website: 'https://www.lyzahyzubocil.tv',
        color: ['#AC4518', '#AABAC6', '#03AEEE'],
        type: ['Cafe', 'Cinema', 'carriere'],
        category: ['Food', 'Culture', 'Négoce', 'Poste Chaud', 'K3+ (seuil inerte x3)', 'ISDND'],
        fullSchedule: {
          Lundi: '09:30-12:00 / 14:30-17:00',
          Mardi: '09:30-12:00 / 14:30-17:00',
          Mercredi: '09:30-12:00',
          Jeudi: '09:30-12:00 / 14:30-17:00',
          Vendredi: '09:30-12:00',
          Samedi: 'Ferm\u00e9',
          Dimanche: 'Ferm\u00e9'
        },
        picture: 'https://www.drone-malin.com/medias/album/carriere-en-photo-aerienne-par-drone.jpg'
      },
      {
        id: '2',
        name: 'Utopia',
        longitude: '23.7305',
        latitude: '38.6855',
        address: 'Error blanditiis in ',
        phone: '+1 (686) 173-4118',
        schedule: '09:30-12:00',
        website: 'https://www.pilyc.com.au',
        color: ['#AABAC6'],
        type: ['Restaurant', 'Cinema'],
        category: ['Food', 'Culture', 'ISDND', 'carrières', 'Poste Chaud'],
        fullSchedule: {
          Lundi: '08:00-19:00',
          Mardi: '08:00-19:00',
          Mercredi: '09:30-12:00',
          Jeudi: '08:00-19:00',
          Vendredi: '08:00-19:00',
          Samedi: 'Ferm\u00e9',
          Dimanche: 'Ferm\u00e9'
        },
        picture: 'https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/3/6/6/366893c13a_73800_album-carriere10.jpg'
      },
      {
        id: '3',
        name: 'Hanna Ross',
        longitude: '36.7383',
        latitude: '39.3574',
        address: 'Praesentium soluta d',
        phone: '+1 (491) 289-2448',
        schedule: '09:30-12:00',
        website: 'https://www.vujuq.com',
        color: ['#AC4518', '#AABAC6', '#03AEEE'],
        type: ['Museum', 'gallery', 'Culture'],
        category: ['Culture', 'ISDND', 'K3+ (seuil inerte x3)'],
        fullSchedule: {
          Lundi: '09:00-18:00',
          Mardi: '09:00-18:00',
          Mercredi: '09:30-12:00',
          Jeudi: '09:00-18:00',
          Vendredi: '09:00-18:00',
          Samedi: 'Ferm\u00e9',
          Dimanche: 'Ferm\u00e9'
        },
        picture: 'https://www.proginov.com/images/bg_bloc_carrieres.jpg'
      },
      {
        id: '4',
        name: 'Libby Rose',
        longitude: '-4.92188',
        latitude: '38.5482',
        address: 'Numquam maiores quis',
        phone: '+1 (734) 644-7062',
        schedule: '07:30-12:00 / 13:30-17:30',
        website: 'https://www.viti.us',
        color: ['#03AEEE'],
        type: ['Restaurant'],
        category: ['Food'],
        fullSchedule: {
          Lundi: '07:30-12:00 / 13:30-17:30',
          Mardi: '07:30-12:00 / 13:30-17:30',
          Mercredi: '07:30-12:00 / 13:00-17:30 / 22:00-23:00',
          Jeudi: '07:30-12:00 / 13:30-17:30',
          Vendredi: '07:30-12:00 / 13:30-17:30',
          Samedi: '07:30-12:00 / 13:30-17:30',
          Dimanche: 'Ferm\u00e9'
        },
        picture: 'https://www.groupe-pigeon.com/sites/groupe-pigeon.com/files/actualite/visuels/carriere_0.jpg'
      },
      {
        id: '5',
        name: 'John Mejia',
        longitude: '30.2344',
        latitude: '63.5486',
        address: 'Anim quasi quo moles',
        phone: '+1 (569) 935-8756',
        schedule: '09:00-12:30 / 15:00-19:30',
        website: 'https://www.radikin.co.uk',
        color: ['#03AEEE'],
        type: ['Restaurant'],
        category: ['Food'],
        fullSchedule: {
          Lundi: 'Ferm\u00e9',
          Mardi: '09:00-12:30 / 15:00-19:30',
          Mercredi: '09:00-12:30 / 14:00-19:30',
          Jeudi: '09:00-12:30 / 15:00-19:30',
          Vendredi: '09:00-12:30 / 15:00-19:30',
          Samedi: '09:00-12:30 / 15:00-19:30',
          Dimanche: '09:00-12:30'
        },
        picture: 'https://www.carriere-lagadec.fr/wp-content/uploads/2019/03/carrieres-lagadec-home-80.jpg'
      },
      {
        id: '6',
        name: 'Barbara Larson',
        longitude: '12.6562',
        latitude: '60.587',
        address: 'Est vel reprehender',
        phone: '+1 (667) 271-5683',
        schedule: '14:00-19:00',
        website: 'https://www.refunipeh.com',
        color: ['#AC4518', '#AABAC6', '#03AEEE'],
        type: ['Museum', 'carriere', 'Restaurant'],
        category: ['Culture'],
        fullSchedule: {
          Lundi: 'Ferm\u00e9',
          Mardi: '09:00-19:00',
          Mercredi: '14:00-19:00',
          Jeudi: '09:00-19:00',
          Vendredi: '09:00-19:00',
          Samedi: '09:00-19:00',
          Dimanche: 'Ferm\u00e9'
        },
        picture: null
      },
      {
        id: '7',
        name: 'Jayme Byrd',
        longitude: '26.0156',
        latitude: '7.71099',
        address: 'Facere velit repudia',
        phone: '+1 (728) 448-7454',
        schedule: '10:00-18:00',
        website: 'https://www.pecaqyxujive.biz',
        color: ['#0000FF'],
        type: ['Library'],
        category: ['Culture'],
        fullSchedule: {
          Lundi: 'Ferm\u00e9',
          Mardi: '10:00-18:00',
          Mercredi: '10:00-18:00',
          Jeudi: '10:00-18:00',
          Vendredi: '10:00-18:00',
          Samedi: '10:00-18:00',
          Dimanche: 'Ferm\u00e9'
        },
        picture: null
      },
      {
        id: '8',
        name: 'Constance Drake',
        longitude: '42.8906',
        latitude: '52.4828',
        address: 'Porro rerum proident',
        phone: '+1 (635) 657-2032',
        schedule: '04:30-23:00',
        website: 'https://www.juhus.in',
        color: ['#000000'],
        type: ['Restaurant'],
        category: ['Food'],
        fullSchedule: {
          Lundi: '04:30-23:00',
          Mardi: '04:30-23:00',
          Mercredi: '04:30-23:00',
          Jeudi: '04:30-23:00',
          Vendredi: '04:30-23:00',
          Samedi: '04:30-23:00',
          Dimanche: '04:30-23:00'
        },
        picture: null
      },
      {
        id: '9',
        name: 'Todd Torres',
        longitude: '2.46094',
        latitude: '26.7456',
        address: 'Ab rerum ducimus ob',
        phone: '+1 (611) 229-7446',
        schedule: 'Ferm\u00e9',
        website: 'https://www.vamevexe.org.uk',
        color: ['#FF0000'],
        type: ['Museum'],
        category: ['Culture'],
        fullSchedule: {
          Lundi: 'Ferm\u00e9',
          Mardi: 'Ferm\u00e9',
          Mercredi: 'Ferm\u00e9',
          Jeudi: 'Ferm\u00e9',
          Vendredi: 'Ferm\u00e9',
          Samedi: 'Ferm\u00e9',
          Dimanche: 'Ferm\u00e9'
        },
        picture: null
      },
      {
        id: '10',
        name: 'Tamara Carter',
        longitude: '4.21875',
        latitude: '46.0732',
        address: 'Soluta est harum sap',
        phone: '+1 (165) 409-9987',
        schedule: 'Ferm\u00e9',
        website: 'https://www.ninuc.co.uk',
        color: ['#0000FF'],
        type: ['Library'],
        category: ['ISDND'],
        fullSchedule: {
          Lundi: 'Ferm\u00e9',
          Mardi: '10:00-12:30 / 13:30-18:00',
          Mercredi: 'Ferm\u00e9',
          Jeudi: '10:00-12:30 / 13:30-18:00',
          Vendredi: 'Ferm\u00e9',
          Samedi: '10:00-12:30',
          Dimanche: 'Ferm\u00e9'
        },
        picture: null
      }
    ]
  }

  // -------------------filter the entities that doesn't have long/lat data
  let filteredData = []
  const verifiedEntities = testDatas.entities.filter((entity) => {
    if (entity.latitude && entity.longitude) {
      return entity
    } else {
      return false
    }
  })

  filteredData = verifiedEntities

  const filtersKeys = Object.keys(testDatas.filters)

  const [selectedInstitution, setSelectedInstitution] = useState()
  const [filteredEntities, setFilteredEntities] = useState(filteredData)

  return (
    <>
      <section {...blockProps}>
        <h1>ayaya</h1>
        <Map
          data={filteredEntities}
          selectedInstitution={selectedInstitution}
          setSelectedInstitution={setSelectedInstitution}
          client={testDatas.client}
          filtersKeys={filtersKeys}
          filters={testDatas.filters}
        />
      </section>
    </>
  )
}

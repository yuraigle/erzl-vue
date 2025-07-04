export const mpi = `
# Параметры ответа для Show = Person
3.2.1.1.||firstName|О|имя|string|
3.2.1.2.||surname|О|фамилия|string|
3.2.1.3.||patronymic|Н|отчество|string|
3.2.1.4.||birthDay|О|дата рождения|date|
3.2.1.5.||gender|О|Половая принадлежность|integer|
3.2.1.6.||birthOksm|Н|Cтрана рождения|string|O001
3.2.1.7.||deathDate|Н|Дата смерти|date|
3.2.1.8.||whenMerged|О|Дата и время объединения с дубликатом|dateTime|
3.2.1.9.||status|О|Статус персоны|string|
3.2.1.10.||dateEdit|О|Дата и время изменения записи|dateTime|

# Параметры ответа для Show = OmsPolicy
3.3.1.1.||pcySer|Н|серия полиса (старого образца)|string|
3.3.1.2.||pcyNum|Н|номер полиса (старого образца)|string|
3.3.1.3.||enpCalc|Н|ЕНП расчетный|string|
3.3.1.4.||enp|О|ЕНП|string|
3.3.1.5.||pcyDateB|О|Дата начала действия полиса|date|
3.3.1.6.||pcyDateE|Н|Дата окончания действия полиса|date|
3.3.1.7.||pcyDateH|Н|Дата выдачи полиса на руки|date|
3.3.1.8.||pcyDateT|Н|Дата обращения за полисом|date|
3.3.1.9.||pcyDateEnpCalc|Н|Дата расчёта номера ЕНП|date|
3.3.1.10.||pcyDatePr|Н|Дата изготовления полиса|date|
3.3.1.11.||pcyType|О|Тип полиса страхования|string|
3.3.1.12.||pcyStatus|О|статус полиса|string|
3.3.1.13.||okato|О|ОКАТО территории страхования|string|O002
3.3.1.14.||dsource|О|источник данных|string|
3.3.1.15.||dsourceType|О|вид источника данных|string|
3.3.1.16.||descr|Н|Описание|string|
3.3.1.17.||gender|Н|Половая принадлежность|string|
3.3.1.18.||insurName|Н|Официальная СМО, указанная в полисе ОМС|string|F002
3.3.1.19.||insurfName|О|Фактическая СМО|string|F002
3.3.1.20.||insurOgrn|Н|ОГРН официальной СМО, указанной в полисе ОМС|string|F002
3.3.1.21.||insurfOgrn|О|ОГРН фактической СМО |string|F002
3.3.1.22.||insurCode|Н|код официальной СМО, указанной в полисе ОМС|string|F002
3.3.1.23.||insurfCode|О|код фактической СМО |string|F002
3.3.1.24.||insurfDate|Н|Дата начала работы с ЗЛ фактической СМО|date|
3.3.1.25.||tmpcertNum|Н|номер временного свидетельства|string|
3.3.1.26.||tmpcertDateB|Н|Дата начала действия ВС|date|
3.3.1.27.||tmpcertDateE|Н|Дата окончания действия ВС|date|
3.3.1.28.||uekNum|Н|Номер универсальной электронной карты|string|
3.3.1.29.||pcyCategory|Н|Категория ЗЛ для получения полиса страхования|string|V013
3.3.1.30.||surname|Н|фамилия|string|
3.3.1.31.||patronymic|Н|отчество|string|
3.3.1.32.||firstName|Н|имя|string|
3.3.1.33.||birthDay|Н|дата рождения|date|
3.3.1.34.||blankNum|Н|номер бланка полиса|string|

# Параметры ответа для Show = Dudl
3.4.1.1.||dudlSer|Н|серия ДУДЛ|string|
3.4.1.2.||dudlNum|О|номер ДУДЛ|string|
3.4.1.3.||dudlDateB|О|Дата начала действия ДУДЛ|date|
3.4.1.4.||dudlDateE|Н|Дата окончания действия ДУДЛ|date|
3.4.1.5.||dudlType|О|Тип ДУДЛ|string|F011
3.4.1.6.||issuer|Н|Кем выдан|string|
3.4.1.7.||issuerOksm|Н|Код страны выдачи|string|O001
3.4.1.8.||ctznOksm|Н|Гражданство|string|O001
3.4.1.9.||noCitizenship|О|Признак отсутствия гражданства|boolean|
3.4.1.10.||dsource|О|источник данных|string|
3.4.1.11.||descr|Н|Описание|string|
3.4.1.12.||surname|Н|фамилия|string|
3.4.1.13.||patronymic|Н|отчество|string|
3.4.1.14.||firstName|Н|имя|string|
3.4.1.15.||birthDay|Н|дата рождения|date|
3.4.1.16.||birthplace|Н|место рождения|string|
3.4.1.17.||gender|Н|Половая принадлежность|string|
3.4.1.18.||dsourceType|О|вид источника данных|string|
3.4.1.19.||birthOksm|Н|страна рождения|string|O001
3.4.1.20.||dudlStatus|О|статус ДУДЛ|string|
3.4.1.21.||dost|Н|Коды надежности идентификации|string|
3.4.1.22||dudlCodeDivision|Н|код подразделения, выдавшего ДУДЛ|string|

# Параметры ответа для Show = Address
3.5.1.1.||okato|Н|ОКАТО|string|O002
3.5.1.2.||oksm|Н|ОКСМ, по умолчанию - РФ|string|O001
3.5.1.3.||aoguid|Н|код ГАР до УЛИЦЫ|string|Код ГАР с точностью до УЛИЦЫ
3.5.1.4.||hsguid|Н|Код ГАР дома|string|Код ГАР с точностью до дома
3.5.1.5.||addressText|Н|текстовое представление адреса|string|
3.5.1.6.||mailIndex|Н|почтовый индекс|string|
3.5.1.7.||appNum|Н|Номер квартиры при наличии кодов ГАР|string|
3.5.1.8.||dsourceType|О|вид источника данных|string|
3.5.1.9.||dsource|О|источник данных|string|
3.5.1.10.||addressType|О|Тип адреса|string|
3.5.1.11.||addressDateB|О|дата начало действия адреса|date|
3.5.1.12.||addressDateE|Н|дата конца действия адреса|date|
3.5.1.13.||addressStatus|О|статус адреса|string|

# Параметры ответа для Show = Attach
3.6.1.1.||areaType|О|Код типа участка|integer|
3.6.1.2.||areaId|Н|ИД участка МО прикрепления|string|
3.6.1.3.||attachMethod|О|Способ прикрепления|integer|
3.6.1.4.||mcapitation|О|Метка прикрепления с типом финансирования|string|
3.6.1.5.||dateAttachB|О|Дата начала прикрепления|date|
3.6.1.6.||dateAttachE|Н|Дата окончания прикрепления.|date|
3.6.1.7.||moId|Н|Идентификатор МО|string|OID МО. Справочник ФРМО
3.6.1.8.||moCode|О|6-ти значный код МО в реестре ОМС|string|F032
3.6.1.9.||moFId|Н|Идентификатор филиала МО|string|
3.6.1.10.||snilsDoctor|Н|СНИЛС участкового врача|string|
3.6.1.11.||doctorId|Н|ИД участкового врача МО|string|
3.6.1.12.||doctorSince|Н|Фактическая дата прикрепления к врачу|date|
3.6.1.13.||descr|Н|Описание|string|
3.6.1.14.||moOkato|О|ОКАТО территории медицинской организации|string|
3.6.1.15.||attachStatus|О|Статус прикрепления|string|
3.6.1.16.||dsource|О|источник данных|string|
3.6.1.17.||dsourceType|О|вид источника данных|string|
3.6.1.18.||depId|Н|код структурного подразделения МО|string|

# Параметры ответа для Show = Contact
3.7.1.1.||contactType|О|Тип контакта:
3.7.1.2.||descr|Н|Описание|string|
3.7.1.3.||contactText|О|Содержимое контакта|string|
3.7.1.4.||dsourceType|О|Вид источника данных|string|
3.7.1.5.||dsource|О|Источник данных|string|
3.7.1.6.||contactStatus|О|Статус контакта|string|

# Параметры ответа для Show = Snils
3.8.1.1.||snils|О|СНИЛС|string|
3.8.1.2.||dsource|О|источник данных|string|
3.8.1.3.||dsourceType|О|вид источника данных|string|
3.8.1.4.||descr|Н|Описание|string|
3.8.1.5.||statusSnils|О|Cтатус СНИЛС|string|

# Параметры ответа для Show = SocialStatus
3.9.1.1.||socialStatus|О|статус|string|
3.9.1.2.||dsourceType|О|вид источника данных|string|
3.9.1.3.||dsource|О|источник данных|string|
3.9.1.4.||descr|Н|Описание|string|
3.9.1.5.||regDate|О|Дата регистрации состояния|date|

# Параметры ответа для Show =Ern
3.10.1.1.||ern|О|ИД ЕРН|string|
3.10.1.2.||dsourceType|О|вид источника данных|string|
3.10.1.3.||dsource|О|источник данных|string|
3.10.1.4.||ernStatus|О|Статус ИД ЕРН|string|
`

export const getMpiFiltered = (type: string): Map<string, string> => {
  const mpi1 = new Map<string, string>()

  mpi.split('\n').forEach((line) => {
    if (line.trim() === '' || line.startsWith('#')) return
    if (!line.startsWith(type)) return

    const parts = line.split('|')
    mpi1.set(parts[2], line)
  })

  return mpi1
}

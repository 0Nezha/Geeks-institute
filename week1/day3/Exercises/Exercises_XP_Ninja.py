#Exercise 1 : Call History
#1
class Phone():
    def __init__(self, phone_number):
        self.phone_number=phone_number
        self.call_history = []
#4
        self.messages = []
#2
    def call(self,other_phone):
        res=print(f"Calling {other_phone} from {self.phone_number}")
        self.call_history.append(other_phone)
        return res
    
    def call(self, other_phone):
        recordcall = f"{self.phone_number} called {other_phone.phone_number}"
        print(recordcall)
        self.call_history.append(recordcall)
#3
    def show_call_history(self):
        for phone in self.call_history:
            print(phone)
#5
    def send_message(self, other_phone, content):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        self.messages.append(message)
#6
    def show_outgoing_messages(self):
        for  message in self.messages:
            if message["from"] == self.phone_number:
                print(message)
    def show_incoming_messages(self):
        for  message in self.messages:
            if message["to"] == self.phone_number:
                print(message)
    def show_messages_from(self,other_phone):
        for  message in self.messages:
            if message["from"] == other_phone.phone_number:
                print(message)
#7
phone1=Phone("063-567-8907")
phone2=Phone("066-990-8640")
phone1.call(phone2.phone_number)
phone1.show_call_history()
phone1.send_message(phone2.phone_number,"Assalam alikom!")
phone1.show_outgoing_messages()
phone1.show_incoming_messages()
phone1.show_messages_from(phone2.phone_number)
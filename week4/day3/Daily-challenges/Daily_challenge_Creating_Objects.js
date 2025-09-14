//1:
class Video{
    constructor(title,uploader,time){
        this.title=title,
        this.uploader=uploader,
        this.time=time
        
    }
  //2:  
    watch(){
        console.log(`${this.uploader} watched all ${this.time}  of ${this.title} !`) 
    }

}
//3:
const instance1= new Video("Learn python part1","Salim","1500s");
instance1.watch();
//4:
const instance2= new Video("Learn python part2","Salim","2000s");
instance2.watch();
//5:
const videoData = [
  { title: "Video1", uploader: "User1", time: 600 },
  { title: "Video2", uploader: "User2", time: 120 },
  { title: "Video3", uploader: "User3", time: 900 },
  { title: "Video4", uploader: "User4", time: 80 },
  { title: "Video5", uploader: "User5", time: 56 }
];
//6:
videoData.forEach(data=>{
    const videoo=new Video(data.title, data.uploader, data.time)
    videoo.watch();
});
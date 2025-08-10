namespace BrickStoreBackend.DTO
{
    public class AppointmentDTO
    {
        public long UserId { get; set; }
        public long EngineerId { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public double Sqft { get; set; }
        public int Bhk { get; set; }
        public int Floor { get; set; }
        public string LandDescription { get; set; }
    }
}
